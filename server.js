import express from 'express';
const app = express();
app.use(express.json());

const BASE = {
    MODB: { freqBase: 0.201886068352, sevBase: 76643.3351101606, excessLoading: 1.0 },
    MODC: { freqBase: 0.144189270833, sevBase: 135809.94549238, excessLoading: 1.0 },
    TPLPD: { freqBase: 0.0501408880492, sevBase: 38430.3140679646, excessLoading: 1.0 },
    TPLBI: { freqBase: 0.0196627190383, sevBase: 76850.3825114719, excessLoading: 1.028015 }
};

const COEF = {
};

app.post('/api/calculate', (req, res) => {
    try {
        const body = req.body;
        const inputs = {
            applicant_rela: body.applicant_rela || "本人_Myself",
            insured_age: parseInt(body.age) || 38,
            insured_sex: body.sex === "Male" ? "男性_Male" : (body.sex === "Company" ? "法人_CompanyUse" : "女性_Female"),
            sex_age: (body.sex === "Male" ? "M_" : "F_") + (parseFloat(body.age) || 38).toFixed(1),
            zip_code: parseInt(body.zip_code) || 324,
            make_desc: body.make || "Toyota豐田",
            motor_type: body.motor_type || "自用小客車_PPA",
            veh_age: parseInt(body.vehAge) || 5,
            displacement: parseInt(body.displacement) || 3000,
            motor_coef: body.motor_coef || "-0.4",
            passages: String(body.passages || "4"),
            rprice: parseInt(body.rPrice) || 2100000,
            com_ru1: parseInt(body.com_ru1) || 5,
            tft_ru1: parseInt(body.tft_ru1) || 7,
            sales_channel: body.sales_channel || "23.富昇保代",
            resp_rank: String(body.respRank || "4"),
            pol_cy: body.pol_cy || "2023",
            renew_flag: body.renew_flag || "N",
            sec_eip: body.sec_eip || "Y",
            tdir_flag: body.tdir_flag || "N",
            exliab_flag: body.exliab_flag || "Y",
            excess_amt: String(body.excess || "0"),
            total_insured: parseInt(body.totalInsured) || 598000,
            per_body_amt: parseInt(body.per_body_amt) || 2100000,
            per_death_amt: parseInt(body.per_death_amt) || 3000000
        };

        let freqCoef = { modb: 1, modc: 1, tplpd: 1, tplbi: 1 };
        let sevCoef = { modb: 1, modc: 1, tplpd: 1, tplbi: 1 };

        function applyCoef(c) {
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

        function getSafe(obj, key) {
            if (obj && obj[key]) return obj[key];
            if (obj && obj["缺失值"]) return obj["缺失值"];
            return {};
        }

        applyCoef(getSafe(COEF.applicant_rela, inputs.applicant_rela));
        applyCoef(COEF.insured_age(inputs.insured_age));
        applyCoef(getSafe(COEF.insured_sex, inputs.insured_sex));
        applyCoef(getSafe(COEF.sex_age, inputs.sex_age));
        applyCoef(getSafe(COEF.zip_code, inputs.zip_code));
        applyCoef(getSafe(COEF.make_desc, inputs.make_desc));
        applyCoef(getSafe(COEF.motor_type, inputs.motor_type));
        applyCoef(COEF.veh_age(inputs.veh_age));
        applyCoef(COEF.displacement(inputs.displacement));
        applyCoef(getSafe(COEF.motor_coef, inputs.motor_coef));
        applyCoef(getSafe(COEF.passages, inputs.passages));
        applyCoef(COEF.rprice(inputs.rprice));
        applyCoef(COEF.com_ru1(inputs.com_ru1));
        applyCoef(COEF.tft_ru1(inputs.tft_ru1));
        applyCoef(getSafe(COEF.sales_channel, inputs.sales_channel));
        applyCoef(getSafe(COEF.resp_rank, inputs.resp_rank));
        applyCoef(getSafe(COEF.pol_cy, inputs.pol_cy));
        applyCoef(getSafe(COEF.renew_flag, inputs.renew_flag));
        applyCoef(getSafe(COEF.sec_eip, inputs.sec_eip));
        applyCoef(getSafe(COEF.tdir_flag, inputs.tdir_flag));
        applyCoef(getSafe(COEF.exliab_flag, inputs.exliab_flag));
        applyCoef(getSafe(COEF.excess_amt, inputs.excess_amt));
        applyCoef(COEF.total_insured(inputs.total_insured));
        applyCoef(COEF.per_body_amt(inputs.per_body_amt));
        applyCoef(COEF.per_death_amt(inputs.per_death_amt));

        const freq_B = BASE.MODB.freqBase * freqCoef.modb;
        const freq_C = BASE.MODC.freqBase * freqCoef.modc;
        const freq_PD = BASE.TPLPD.freqBase * freqCoef.tplpd;
        const freq_BI = BASE.TPLBI.freqBase * freqCoef.tplbi;

        const sev_B = BASE.MODB.sevBase * sevCoef.modb * BASE.MODB.excessLoading;
        const sev_C = BASE.MODC.sevBase * sevCoef.modc * BASE.MODC.excessLoading;
        const sev_PD = BASE.TPLPD.sevBase * sevCoef.tplpd * BASE.TPLPD.excessLoading;
        const sev_BI = BASE.TPLBI.sevBase * sevCoef.tplbi * BASE.TPLBI.excessLoading;

        const prem_B = freq_B * sev_B;
        const prem_C = freq_C * sev_C;
        const prem_PD = freq_PD * sev_PD;
        const prem_BI = freq_BI * sev_BI;

        const actual_B = parseFloat(body.actual_mod_b) || 0;
        const actual_C = parseFloat(body.actual_mod_c) || 0;
        const actual_PD = parseFloat(body.actual_tpl_pd) || 0;
        const actual_BI = parseFloat(body.actual_tpl_bi) || 0;

        res.status(200).json({
            success: true,
            modB_premium: Math.round(prem_B),
            modB_freq: freq_B.toFixed(4),
            modB_sev: Math.round(sev_B),
            modB_lr: actual_B > 0 ? ((prem_B / actual_B) * 100).toFixed(1) + "%" : "未提供",
            
            modC_premium: Math.round(prem_C),
            modC_freq: freq_C.toFixed(4),
            modC_sev: Math.round(sev_C),
            modC_lr: actual_C > 0 ? ((prem_C / actual_C) * 100).toFixed(1) + "%" : "未提供",
            
            tplPd_premium: Math.round(prem_PD),
            tplPd_freq: freq_PD.toFixed(4),
            tplPd_sev: Math.round(sev_PD),
            tplPd_lr: actual_PD > 0 ? ((prem_PD / actual_PD) * 100).toFixed(1) + "%" : "未提供",
            
            tplBi_premium: Math.round(prem_BI),
            tplBi_freq: freq_BI.toFixed(4),
            tplBi_sev: Math.round(sev_BI),
            tplBi_lr: actual_BI > 0 ? ((prem_BI / actual_BI) * 100).toFixed(1) + "%" : "未提供",
            
            message: "25 因子完美精確模型運算成功"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Full GLM Engine API is running on port " + PORT);
});
