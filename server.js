import express from 'express';

const app = express();
app.use(express.json());

// ============ 1. 貼上 HTML 裡的 BASE 與 COEF ============
// 👉 請從您的 carmodel.html 中，把 const BASE = {...} 和 const COEF = {...} 完整複製貼到這裡！
// (因為程式碼太長，請您自己複製貼上，取代這兩行註解)
const BASE = /* 貼上您的 BASE 物件 */;
const COEF = /* 貼上您的 COEF 物件 */;

// ============ 2. 建立 API 端點 ============
app.post('/api/calculate', (req, res) => {
    try {
        // 接收從 Power Automate 傳來的前端參數 (8個核心參數)
        const { 
            age, sex, make, vehAge, rPrice, respRank, excess, totalInsured 
        } = req.body;

        // ============ 3. 整合 25 個因子的輸入值 ============
        // 核心變數使用前端傳來的值，其餘的給予「業務預設值」
        const inputs = {
            applicant_rela: "本人_Myself",
            insured_age: parseInt(age) || 38,
            insured_sex: sex === "Male" ? "男性_Male" : "女性_Female",
            sex_age: (sex === "Male" ? "M_" : "F_") + (parseFloat(age) || 38).toFixed(1),
            zip_code: 324, // 預設地區
            make_desc: make || "Toyota豐田",
            motor_type: "自用小客車_PPA",
            veh_age: parseInt(vehAge) || 5,
            displacement: 3000, // 預設排氣量
            motor_coef: "-0.4",
            passages: "4",
            rprice: parseInt(rPrice) || 2100000,
            com_ru1: 5,
            tft_ru1: 7,
            sales_channel: "23.富昇保代",
            resp_rank: String(respRank || "4"),
            pol_cy: "2023",
            renew_flag: "N",
            sec_eip: "Y",
            tdir_flag: "N",
            exliab_flag: "Y",
            excess_amt: String(excess || "0"),
            total_insured: parseInt(totalInsured) || 598000,
            per_body_amt: 2100000,
            per_death_amt: 3000000
        };

        // ============ 4. 初始化頻率與損失 ============
        let freqCoef = { modb: 1, modc: 1, tplpd: 1, tplbi: 1 };
        let sevCoef = { modb: 1, modc: 1, tplpd: 1, tplbi: 1 };

        // 定義相乘邏輯
        function addCoef(c) {
            if (!c) return;
            if (c.modb_f) freqCoef.modb *= c.modb_f;
            if (c.modb_s) sevCoef.modb *= c.modb_s;
            if (c.modc_f) freqCoef.modc *= c.modc_f;
            if (c.modc_s) sevCoef.modc *= c.modc_s;
            if (c.tplpd_f) freqCoef.tplpd *= c.tplpd_f;
            if (c.tplpd_s) sevCoef.tplpd *= c.tplpd_s;
            if (c.tplbi_f) freqCoef.tplbi *= c.tplbi_f;
            if (c.tplbi_s) sevCoef.tplbi *= c.tplbi_s;
        }

        // ============ 5. 執行 25 項因子查表 ============
        addCoef(COEF.applicant_rela[inputs.applicant_rela]);
        addCoef(COEF.insured_age(inputs.insured_age));
        addCoef(COEF.insured_sex[inputs.insured_sex]);
        addCoef(COEF.sex_age(inputs.sex_age));
        addCoef(COEF.zip_code(inputs.zip_code));
        addCoef(COEF.make_desc[inputs.make_desc] || COEF.make_desc['缺失值']);
        addCoef(COEF.motor_type[inputs.motor_type]);
        addCoef(COEF.veh_age(inputs.veh_age));
        addCoef(COEF.displacement(inputs.displacement));
        addCoef(COEF.motor_coef[inputs.motor_coef]);
        addCoef(COEF.passages[inputs.passages]);
        addCoef(COEF.rprice(inputs.rprice));
        addCoef(COEF.com_ru1(inputs.com_ru1));
        addCoef(COEF.tft_ru1(inputs.tft_ru1));
        addCoef(COEF.sales_channel[inputs.sales_channel]);
        addCoef(COEF.resp_rank[inputs.resp_rank]);
        addCoef(COEF.pol_cy[inputs.pol_cy]);
        addCoef(COEF.renew_flag[inputs.renew_flag]);
        addCoef(COEF.sec_eip[inputs.sec_eip]);
        addCoef(COEF.tdir_flag[inputs.tdir_flag]);
        addCoef(COEF.exliab_flag[inputs.exliab_flag]);
        addCoef(COEF.excess_amt[inputs.excess_amt]);
        addCoef(COEF.total_insured(inputs.total_insured));
        addCoef(COEF.per_body_amt(inputs.per_body_amt));
        addCoef(COEF.per_death_amt(inputs.per_death_amt));

        // ============ 6. 計算最終保費與損失率 ============
        // 計算各險種保費 (Risk Premium)
        const prem_B = Math.round((BASE.MODB.freqBase * freqCoef.modb) * (BASE.MODB.sevBase * sevCoef.modb * BASE.MODB.excessLoading));
        const prem_C = Math.round((BASE.MODC.freqBase * freqCoef.modc) * (BASE.MODC.sevBase * sevCoef.modc * BASE.MODC.excessLoading));
        const prem_PD = Math.round((BASE.TPLPD.freqBase * freqCoef.tplpd) * (BASE.TPLPD.sevBase * sevCoef.tplpd * BASE.TPLPD.excessLoading));
        const prem_BI = Math.round((BASE.TPLBI.freqBase * freqCoef.tplbi) * (BASE.TPLBI.sevBase * sevCoef.tplbi * BASE.TPLBI.excessLoading));

        // 設定實際簽單保費基準 (請填入您公司的實際基準值)
        const actual_B = 20365, actual_C = 3193, actual_PD = 1775, actual_BI = 1218; 

        // 封裝結果並回傳
        res.status(200).json({ 
            success: true,
            modB_premium: prem_B,
            modB_lr: ((prem_B / actual_B) * 100).toFixed(1) + "%",
            modC_premium: prem_C,
            modC_lr: ((prem_C / actual_C) * 100).toFixed(1) + "%",
            tplPd_premium: prem_PD,
            tplPd_lr: ((prem_PD / actual_PD) * 100).toFixed(1) + "%",
            tplBi_premium: prem_BI,
            tplBi_lr: ((prem_BI / actual_BI) * 100).toFixed(1) + "%",
            message: "25因子完整模型運算成功"
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Full GLM Engine API is running on port ${PORT}`);
});
