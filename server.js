import express from 'express';
import fs from 'fs';

// 讀取本地的 JSON 係數表
const coefData = JSON.parse(fs.readFileSync('./coeff_tables.json', 'utf8'));

const app = express();
app.use(express.json()); // 允許解析 JSON 格式的請求

// 建立 API 端點
app.post('/api/calculate', (req, res) => {
    try {
        // 1. 接收前端 (Copilot/Power Automate) 傳來的所有進階參數
        const { 
            age, sex, make, vehAge, rPrice, respRank, excess, totalInsured, 
            excessLoading = 1 
        } = req.body;

        // 2. 模擬查表邏輯
        function getCoef(factorName, key, chosen) {
            const map = coefData[factorName]?.[key];
            if (!map) return 1.0;
            if (chosen in map) return map[chosen];
            const alt = String(Number(chosen));
            if (alt in map) return map[alt];
            return 1.0;
        }

        // 3. 建立內部參數對照表 (對齊您的 JSON 結構)
        const INPUTS = {
            "DRI_insuredAge": age,
            "DRI_INSURED_SEX_CODE": sex === "Male" ? "男性_Male" : "女性_Female",
            "VEH_MAKE_DESC_group": make,
            "VEH_vehAge": vehAge,
            "VEH_RPRICE": rPrice,
            "POL_RESP_RANK": respRank,
            "CVG_EXCESS_AMT": excess,
            "CVG_TOTAL_INSURED": totalInsured
        };

        // 4. 設定各險種的「基準值 (Base)」與「實際簽單保費 (Actual Premium)」
        // 數值精準對接您的 Excel 模型截圖
        let freq_B = 0.2019, sev_B = 76643, actual_B = 20365;
        let freq_C = 0.1442, sev_C = 135810, actual_C = 3193;
        let freq_PD = 0.0501, sev_PD = 38430, actual_PD = 1775;

        // 5. 進行迴圈相乘運算 (一口氣算出所有險種的係數)
        for (const factorName in coefData) {
            const inputVal = INPUTS[factorName] || "";
            
            // 車體乙式
            freq_B *= getCoef(factorName, "MODB_FREQ", inputVal);
            sev_B *= getCoef(factorName, "MODB_SEV", inputVal);
            
            // 車體丙式 (請確認 JSON 裡的 Key 是 MODC_FREQ / MODC_SEV)
            freq_C *= getCoef(factorName, "MODC_FREQ", inputVal);
            sev_C *= getCoef(factorName, "MODC_SEV", inputVal);
            
            // 第三人財損 (請確認 JSON 裡的 Key 是 TPLPD_FREQ / TPLPD_SEV)
            freq_PD *= getCoef(factorName, "TPLPD_FREQ", inputVal);
            sev_PD *= getCoef(factorName, "TPLPD_SEV", inputVal);
        }

        // 6. 算出最終模型風險保費 (Predicted Risk Premium)
        const premium_B = Math.round(freq_B * sev_B * excessLoading);
        const premium_C = Math.round(freq_C * sev_C * excessLoading);
        const premium_PD = Math.round(freq_PD * sev_PD * excessLoading);

        // 7. 計算預期損失率 (Implied Loss Ratio) = 風險保費 / 簽單保費
        const lr_B = ((premium_B / actual_B) * 100).toFixed(1) + "%";
        const lr_C = ((premium_C / actual_C) * 100).toFixed(1) + "%";
        const lr_PD = ((premium_PD / actual_PD) * 100).toFixed(1) + "%";

        // 8. 回傳多維度結果給 AI 助理
        res.status(200).json({ 
            success: true,
            modB_premium: premium_B,
            modB_lr: lr_B,
            modC_premium: premium_C,
            modC_lr: lr_C,
            tplPd_premium: premium_PD,
            tplPd_lr: lr_PD,
            message: "多險種運算成功"
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 設定 Render 要求的通訊埠
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Rating Engine API is running on port ${PORT}`);
});
