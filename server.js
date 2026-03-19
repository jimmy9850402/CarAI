import express from 'express';
import fs from 'fs';

// 讀取本地的 JSON 係數表
const coefData = JSON.parse(fs.readFileSync('./coeff_tables.json', 'utf8'));

const app = express();
app.use(express.json()); // 允許解析 JSON 格式的請求

// 建立 API 端點
app.post('/api/calculate', (req, res) => {
    try {
        // 1. 接收前端 (Copilot/Power Automate) 傳來的參數
        const { age, sex, make, excessLoading = 1 } = req.body;

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
            "VEH_MAKE_DESC_group": make
        };

        // 4. 基礎費率 (以車體乙式為例)
        let freq = 0.2019;
        let sev = 76643;

        // 5. 進行迴圈相乘運算
        for (const factorName in coefData) {
            freq *= getCoef(factorName, "MODB_FREQ", INPUTS[factorName] || "");
            sev *= getCoef(factorName, "MODB_SEV", INPUTS[factorName] || "");
        }

        // 6. 算出最終保費
        const premium = Math.round(freq * sev * excessLoading);

        // 7. 回傳結果給 AI 助理
        res.status(200).json({ 
            success: true,
            premium: premium,
            message: "運算成功"
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
