import express from 'express';
import fs from 'fs';

// 讀取本地的 JSON 係數表
const coefData = JSON.parse(fs.readFileSync('./coeff_tables.json', 'utf8'));

const app = express();
app.use(express.json()); // 允許解析 JSON 格式的請求

// 建立 API 端點
app.post('/api/calculate', (req, res) => {
    try {
        // 1. 接收前端傳來的所有參數
        const { 
            age, sex, make, vehAge, rPrice, respRank, excess, totalInsured, 
            excessLoading = 1 
        } = req.body;

        // 2. 超級智能查表邏輯 (解決 JSON 裡的 "5.0" 或 "缺失值" 問題)
        function getCoef(factorName, targetKey, chosen) {
            const map = coefData[factorName]?.[targetKey];
            if (!map) return 1.0; // 如果這個因子沒有這個險種的係數，回傳 1.0

            // 情況 A：完全匹配 (例如 "Toyota豐田" 或 "男性_Male")
            if (chosen && chosen in map) return map[chosen];

            // 如果有傳入數值，處理數字格式的匹配
            if (chosen && chosen.trim() !== "") {
                const numStr = String(Number(chosen));
                const floatStr = Number(chosen).toFixed(1); // 轉成帶一位小數，例如 "5.0"
                
                // 情況 B：整數匹配 (例如 "38")
                if (numStr in map) return map[numStr];
                // 情況 C：小數點匹配 (例如 "5.0", "50000.0")
                if (floatStr in map) return map[floatStr];
            }

            // 情況 D：如果前端沒傳，或上面都找不到，嘗試抓取 "缺失值"
            if ("缺失值" in map) return map["缺失值"];

            // 最後防線：真的沒有就給 1.0
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
        let freq_B = 0.2019, sev_B = 76643, actual_B = 20365;      // 乙式
        let freq_C = 0.1442, sev_C = 135810, actual_C = 3193;      // 丙式
        let freq_PD = 0.0501, sev_PD = 38430, actual_PD = 1775;    // 第三人財損
        let freq_BI = 1.1659, sev_BI = 76850, actual_BI = 1218;    // 第三人體傷

        // 5. 進行迴圈相乘運算 (根據 JSON 實際的 Key 進行運算)
        for (const factorName in coefData) {
            const inputVal = INPUTS[factorName] || "";
            
            // 車體乙式 (MODB_FREQ, MODB_SEV)
            freq_B *= getCoef(factorName, "MODB_FREQ", inputVal);
            sev_B *= getCoef(factorName, "MODB_SEV", inputVal);
            
            // 車體丙式 (MODC_FREQ, MODC_SEV)
            freq_C *= getCoef(factorName, "MODC_FREQ", inputVal);
            sev_C *= getCoef(factorName, "MODC_SEV", inputVal);
            
            // 第三人財損 (TPLPD_FREQ, TPLPD_SEV)
            freq_PD *= getCoef(factorName, "TPLPD_FREQ", inputVal);
            sev_PD *= getCoef(factorName, "TPLPD_SEV", inputVal);

            // 第三人體傷 (TPLBI_FREQ, TPLBI_SEV)
            freq_BI *= getCoef(factorName, "TPLBI_FREQ", inputVal);
            sev_BI *= getCoef(factorName, "TPLBI_SEV", inputVal);
        }

        // 6. 算出最終模型風險保費 (Predicted Risk Premium)
        const premium_B = Math.round(freq_B * sev_B * excessLoading);
        const premium_C = Math.round(freq_C * sev_C * excessLoading);
        const premium_PD = Math.round(freq_PD * sev_PD * excessLoading);
        const premium_BI = Math.round(freq_BI * sev_BI * excessLoading);

        // 7. 計算預期損失率 (Implied Loss Ratio)
        const lr_B = ((premium_B / actual_B) * 100).toFixed(1) + "%";
        const lr_C = ((premium_C / actual_C) * 100).toFixed(1) + "%";
        const lr_PD = ((premium_PD / actual_PD) * 100).toFixed(1) + "%";
        const lr_BI = ((premium_BI / actual_BI) * 100).toFixed(1) + "%";

        // 8. 封裝結果回傳
        res.status(200).json({ 
            success: true,
            modB_premium: premium_B,
            modB_lr: lr_B,
            modC_premium: premium_C,
            modC_lr: lr_C,
            tplPd_premium: premium_PD,
            tplPd_lr: lr_PD,
            tplBi_premium: premium_BI,
            tplBi_lr: lr_BI,
            message: "全險種運算成功"
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
