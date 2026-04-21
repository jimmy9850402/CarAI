import express from 'express';

const app = express();
app.use(express.json());

// ============ 1. 基礎值 (Intercept) ============
const BASE = {
    MODB: { freqBase: 0.201886068352, sevBase: 76643.3351101606, excessLoading: 1.0 },
    MODC: { freqBase: 0.144189270833, sevBase: 135809.94549238, excessLoading: 1.0 },
    TPLPD: { freqBase: 0.0501408880492, sevBase: 38430.3140679646, excessLoading: 1.0 },
    TPLBI: { freqBase: 0.0196627190383, sevBase: 76850.3825114719, excessLoading: 1.028015 }
};

// ============ 2. 係數表 (25個風險因數完整精確版) ============
const COEF = {
    applicant_rela: {
        "(外)孫子女_Grandchildren": { modb_f: 1.000000 },
        "(外)祖父母_Grandparents": { modb_f: 1.000000 },
        "(外)祖孫_Grandchildren": { modb_f: 1.000000 },
        "缺失值": { modb_f: 0.955159 },
        "本人_Myself": { modb_f: 1.000000 },
        "父母_Parents": { modb_f: 1.007200 },
        "父女_Father and daughter": { modb_f: 1.000000 },
        "父子_Father and son": { modb_f: 1.000000 },
        "僱傭_Empolyment": { modb_f: 1.039632 },
        "母女_Monther and daughter": { modb_f: 1.000000 },
        "母子_Mother and son": { modb_f: 0.947251 },
        "配偶_Spouse": { modb_f: 0.938466 },
        "配偶父母_Spouse's parents": { modb_f: 1.000000 },
        "其他_Others": { modb_f: 1.000000 },
        "兄弟姐妹_Siblings": { modb_f: 1.000000 },
        "債權債務關係_Debt Relationship": { modb_f: 1.000000 },
        "主辦單位_Organizer": { modb_f: 1.000000 },
        "子女_Child": { modb_f: 1.000000 }
    },
    insured_age: function(val) {
        if (val <= 6.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 7.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 9.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 10.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 11.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 12.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 13.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 14.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 15.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 16.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 17.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 18.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.985577 };
        if (val <= 19.0) return { modb_f: 1.554482, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.967450 };
        if (val <= 20.0) return { modb_f: 1.447585, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 2.066756, tplpd_s: 1.076983, tplbi_f: 1.963245 };
        if (val <= 21.0) return { modb_f: 1.360124, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 1.744917, tplpd_s: 1.076983, tplbi_f: 1.963245 };
        if (val <= 22.0) return { modb_f: 1.360124, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 1.490070, tplpd_s: 1.076983, tplbi_f: 1.686457 };
        if (val <= 23.0) return { modb_f: 1.360124, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 1.319827, tplpd_s: 1.076983, tplbi_f: 1.510289 };
        if (val <= 24.0) return { modb_f: 1.360124, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 1.319827, tplpd_s: 1.056384, tplbi_f: 1.272941 };
        if (val <= 25.0) return { modb_f: 1.163246, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 1.319827, tplpd_s: 1.056384, tplbi_f: 1.185303 };
        if (val <= 26.0) return { modb_f: 1.119310, modb_s: 1.189308, modc_s: 1.031617, tplpd_f: 1.224174, tplpd_s: 1.056384, tplbi_f: 1.185303 };
        if (val <= 27.0) return { modb_f: 1.016264, modb_s: 1.074922, modc_s: 1.010792, tplpd_f: 1.159935, tplpd_s: 1.056384, tplbi_f: 1.149308 };
        if (val <= 28.0) return { modb_f: 1.005337, modb_s: 1.074922, modc_s: 1.010792, tplpd_f: 1.029099, tplpd_s: 1.056384, tplbi_f: 1.031785 };
        if (val <= 29.0) return { modb_f: 1.005337, modb_s: 1.074922, modc_s: 1.010792, tplpd_f: 1.024246, tplpd_s: 1.056384, tplbi_f: 1.031785 };
        if (val <= 30.0) return { modb_f: 0.967005, modb_s: 1.074922, modc_s: 1.000168, tplpd_f: 0.967327, tplpd_s: 1.056384, tplbi_f: 1.031785 };
        if (val <= 31.0) return { modb_f: 0.963363, modb_s: 1.074922, modc_s: 1.000168, tplpd_f: 0.953366, tplpd_s: 1.040601, tplbi_f: 0.977110 };
        if (val <= 32.0) return { modb_f: 0.963363, modb_s: 1.022367, modc_s: 1.000168, tplpd_f: 0.945827, tplpd_s: 1.039844, tplbi_f: 0.925440 };
        if (val <= 33.0) return { modb_f: 0.963363, modb_s: 1.022367, modc_s: 1.000168, tplpd_f: 0.907099, tplpd_s: 1.032484, tplbi_f: 0.925440 };
        if (val <= 34.0) return { modb_f: 0.963363, modb_s: 1.005612, modc_s: 1.000168, tplpd_f: 0.895287, tplpd_s: 1.011239, tplbi_f: 0.925440 };
        if (val <= 35.0) return { modb_f: 0.963363, modb_s: 1.005612, modc_s: 0.942542, tplpd_f: 0.895287, tplpd_s: 1.011239, tplbi_f: 0.925440 };
        if (val <= 36.0) return { modb_f: 0.963363, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.848434, tplpd_s: 1.004997, tplbi_f: 0.886100 };
        if (val <= 37.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 1.004997, tplbi_f: 0.886100 };
        if (val <= 38.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 1.004997, tplbi_f: 0.886100 };
        if (val <= 39.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.886100 };
        if (val <= 40.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.876644 };
        if (val <= 41.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.876644 };
        if (val <= 42.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.876644 };
        if (val <= 43.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.872338 };
        if (val <= 44.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.872338 };
        if (val <= 45.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.872338 };
        if (val <= 46.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.872338 };
        if (val <= 47.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.874401 };
        if (val <= 48.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.874401 };
        if (val <= 49.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 50.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 51.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 52.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 53.0) return { modb_f: 0.934326, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 54.0) return { modb_f: 0.998031, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 55.0) return { modb_f: 0.998031, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 56.0) return { modb_f: 0.998031, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 57.0) return { modb_f: 0.998031, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 58.0) return { modb_f: 0.998031, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 59.0) return { modb_f: 0.998031, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 60.0) return { modb_f: 0.998031, modb_s: 0.987120, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.994591, tplbi_f: 0.887077 };
        if (val <= 61.0) return { modb_f: 1.050267, modb_s: 0.973323, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.979571, tplbi_f: 0.887077 };
        if (val <= 62.0) return { modb_f: 1.050267, modb_s: 0.973323, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.979571, tplbi_f: 0.887077 };
        if (val <= 63.0) return { modb_f: 1.050267, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.979571, tplbi_f: 0.887077 };
        if (val <= 64.0) return { modb_f: 1.050267, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.979571, tplbi_f: 0.887077 };
        if (val <= 65.0) return { modb_f: 1.050267, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.979571, tplbi_f: 0.887077 };
        if (val <= 66.0) return { modb_f: 1.050267, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.970442, tplbi_f: 0.887077 };
        if (val <= 67.0) return { modb_f: 1.114547, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.841500, tplpd_s: 0.970442, tplbi_f: 0.887077 };
        if (val <= 68.0) return { modb_f: 1.114547, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.894844, tplpd_s: 0.960428, tplbi_f: 0.887077 };
        if (val <= 69.0) return { modb_f: 1.114547, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.909468, tplpd_s: 0.960428, tplbi_f: 0.887077 };
        if (val <= 70.0) return { modb_f: 1.114547, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.941932, tplpd_s: 0.960428, tplbi_f: 0.887077 };
        if (val <= 71.0) return { modb_f: 1.114547, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.954392, tplpd_s: 0.960428, tplbi_f: 0.980329 };
        if (val <= 72.0) return { modb_f: 1.114547, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 0.991046, tplpd_s: 0.960428, tplbi_f: 0.980329 };
        if (val <= 73.0) return { modb_f: 1.166030, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.030622, tplpd_s: 0.960428, tplbi_f: 0.980329 };
        if (val <= 74.0) return { modb_f: 1.166030, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.089335, tplpd_s: 0.960428, tplbi_f: 0.980329 };
        if (val <= 75.0) return { modb_f: 1.166030, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.089335, tplpd_s: 0.960428, tplbi_f: 1.050111 };
        if (val <= 76.0) return { modb_f: 1.166030, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.089335, tplpd_s: 0.960428, tplbi_f: 1.050111 };
        if (val <= 77.0) return { modb_f: 1.166030, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.089335, tplpd_s: 0.960428, tplbi_f: 1.050111 };
        if (val <= 78.0) return { modb_f: 1.166030, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.104838, tplpd_s: 0.960428, tplbi_f: 1.050111 };
        if (val <= 79.0) return { modb_f: 1.166030, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.050111 };
        if (val <= 80.0) return { modb_f: 1.166030, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.050111 };
        if (val <= 81.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.050111 };
        if (val <= 82.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.050111 };
        if (val <= 83.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.053013 };
        if (val <= 84.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 85.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 86.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 87.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 88.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 89.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 90.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 91.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 92.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 93.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 94.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 95.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 96.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 97.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 98.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 99.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 100.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 101.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 102.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 103.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 104.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 105.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        if (val <= 106.0) return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
        return { modb_f: 1.311799, modb_s: 0.970502, modc_s: 0.942542, tplpd_f: 1.153513, tplpd_s: 0.960428, tplbi_f: 1.190885 };
    },
    insured_sex: {
        "女性_Female": { modb_f: 1.000000, modb_s: 1.000000, tplpd_s: 1.000000 },
        "法人_CompanyUse": { modb_f: 1.010514, modb_s: 1.002916, tplpd_s: 1.025092 },
        "男性_Male": { modb_f: 1.010514, modb_s: 1.047073, tplpd_s: 1.025092 }
    },
    sex_age: {
        "F_18.0": { modc_f: 1.365347 },
        "F_19.0": { modc_f: 1.365347 },
        "F_20.0": { modc_f: 1.365347 },
        "F_21.0": { modc_f: 1.365347 },
        "F_22.0": { modc_f: 1.365347 },
        "F_23.0": { modc_f: 1.259032 },
        "F_24.0": { modc_f: 1.259032 },
        "F_25.0": { modc_f: 1.259032 },
        "F_26.0": { modc_f: 1.259032 },
        "F_27.0": { modc_f: 1.134492 },
        "F_28.0": { modc_f: 1.134492 },
        "F_29.0": { modc_f: 1.134492 },
        "F_30.0": { modc_f: 1.134492 },
        "F_31.0": { modc_f: 1.134492 },
        "F_32.0": { modc_f: 1.114335 },
        "F_33.0": { modc_f: 1.114335 },
        "F_34.0": { modc_f: 1.114335 },
        "F_35.0": { modc_f: 1.114335 },
        "F_36.0": { modc_f: 1.114335 },
        "F_37.0": { modc_f: 1.044712 },
        "F_38.0": { modc_f: 1.044712 },
        "F_39.0": { modc_f: 1.044712 },
        "F_40.0": { modc_f: 1.044712 },
        "F_41.0": { modc_f: 1.010844 },
        "F_42.0": { modc_f: 1.010844 },
        "F_43.0": { modc_f: 0.981825 },
        "F_44.0": { modc_f: 0.981825 },
        "F_45.0": { modc_f: 0.981825 },
        "F_46.0": { modc_f: 0.981825 },
        "F_47.0": { modc_f: 0.981825 },
        "F_48.0": { modc_f: 0.981825 },
        "F_49.0": { modc_f: 0.981825 },
        "F_50.0": { modc_f: 0.981825 },
        "F_51.0": { modc_f: 0.981825 },
        "F_52.0": { modc_f: 0.981825 },
        "F_53.0": { modc_f: 0.981825 },
        "F_54.0": { modc_f: 0.981825 },
        "F_55.0": { modc_f: 0.981825 },
        "F_56.0": { modc_f: 0.981825 },
        "F_57.0": { modc_f: 0.981825 },
        "F_58.0": { modc_f: 0.981825 },
        "F_59.0": { modc_f: 0.981825 },
        "F_60.0": { modc_f: 0.981825 },
        "F_61.0": { modc_f: 0.981825 },
        "F_62.0": { modc_f: 0.981825 },
        "F_63.0": { modc_f: 0.981825 },
        "F_64.0": { modc_f: 0.981825 },
        "F_65.0": { modc_f: 0.981825 },
        "F_66.0": { modc_f: 0.981825 },
        "F_67.0": { modc_f: 0.981825 },
        "F_68.0": { modc_f: 0.981825 },
        "F_69.0": { modc_f: 1.014995 },
        "F_70.0": { modc_f: 1.014995 },
        "F_71.0": { modc_f: 1.014995 },
        "F_72.0": { modc_f: 1.014995 },
        "F_73.0": { modc_f: 1.014995 },
        "F_74.0": { modc_f: 1.014995 },
        "F_75.0": { modc_f: 1.014995 },
        "F_<18": { modc_f: 1.365347 },
        "F_>75": { modc_f: 1.095222 },
        "M_18.0": { modc_f: 1.969224 },
        "M_19.0": { modc_f: 1.969224 },
        "M_20.0": { modc_f: 1.969224 },
        "M_21.0": { modc_f: 1.677458 },
        "M_22.0": { modc_f: 1.529087 },
        "M_23.0": { modc_f: 1.529087 },
        "M_24.0": { modc_f: 1.394410 },
        "M_25.0": { modc_f: 1.394410 },
        "M_26.0": { modc_f: 1.394410 },
        "M_27.0": { modc_f: 1.394410 },
        "M_28.0": { modc_f: 1.270161 },
        "M_29.0": { modc_f: 1.270161 },
        "M_30.0": { modc_f: 1.270161 },
        "M_31.0": { modc_f: 1.270161 },
        "M_32.0": { modc_f: 1.270161 },
        "M_33.0": { modc_f: 1.150545 },
        "M_34.0": { modc_f: 1.150545 },
        "M_35.0": { modc_f: 1.150545 },
        "M_36.0": { modc_f: 1.150545 },
        "M_37.0": { modc_f: 1.054510 },
        "M_38.0": { modc_f: 1.054510 },
        "M_39.0": { modc_f: 1.039467 },
        "M_40.0": { modc_f: 1.038473 },
        "M_41.0": { modc_f: 1.007831 },
        "M_42.0": { modc_f: 0.997753 },
        "M_43.0": { modc_f: 0.997753 },
        "M_44.0": { modc_f: 0.969520 },
        "M_45.0": { modc_f: 0.949364 },
        "M_46.0": { modc_f: 0.949364 },
        "M_47.0": { modc_f: 0.941481 },
        "M_48.0": { modc_f: 0.941481 },
        "M_49.0": { modc_f: 0.941481 },
        "M_50.0": { modc_f: 0.941481 },
        "M_51.0": { modc_f: 0.941481 },
        "M_52.0": { modc_f: 0.941481 },
        "M_53.0": { modc_f: 0.941481 },
        "M_54.0": { modc_f: 0.941481 },
        "M_55.0": { modc_f: 0.941481 },
        "M_56.0": { modc_f: 0.941481 },
        "M_57.0": { modc_f: 0.941481 },
        "M_58.0": { modc_f: 0.941481 },
        "M_59.0": { modc_f: 0.941481 },
        "M_60.0": { modc_f: 0.941481 },
        "M_61.0": { modc_f: 0.941481 },
        "M_62.0": { modc_f: 0.941481 },
        "M_63.0": { modc_f: 0.941481 },
        "M_64.0": { modc_f: 0.941481 },
        "M_65.0": { modc_f: 0.941481 },
        "M_66.0": { modc_f: 0.941481 },
        "M_67.0": { modc_f: 0.941481 },
        "M_68.0": { modc_f: 0.941481 },
        "M_69.0": { modc_f: 0.941481 },
        "M_70.0": { modc_f: 1.010233 },
        "M_71.0": { modc_f: 1.010233 },
        "M_72.0": { modc_f: 1.010233 },
        "M_73.0": { modc_f: 1.010233 },
        "M_74.0": { modc_f: 1.010233 },
        "M_75.0": { modc_f: 1.010233 },
        "M_<18": { modc_f: 1.969224 },
        "M_>75": { modc_f: 1.074191 },
        "法人_CompanyUse": { modc_f: 1.000000 }
    },
    zip_code: {
        "缺失值": { modb_f: 1.000000, modb_s: 1.000000, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 0.999157, tplpd_s: 1.000000, tplbi_f: 1.000756, tplbi_s: 1.000000 },
        "100": { modb_f: 1.015589, modb_s: 0.950012, modc_f: 0.976877, modc_s: 0.952069, tplpd_f: 1.169520, tplpd_s: 1.031560, tplbi_f: 0.824984, tplbi_s: 0.966853 },
        "103": { modb_f: 0.997687, modb_s: 0.945142, modc_f: 0.990839, modc_s: 0.902714, tplpd_f: 1.120790, tplpd_s: 1.035489, tplbi_f: 0.824984, tplbi_s: 0.898754 },
        "104": { modb_f: 1.010253, modb_s: 0.954297, modc_f: 0.963664, modc_s: 0.934688, tplpd_f: 1.177547, tplpd_s: 1.031551, tplbi_f: 0.776357, tplbi_s: 0.954278 },
        "105": { modb_f: 1.014757, modb_s: 0.924735, modc_f: 0.974827, modc_s: 0.937945, tplpd_f: 1.191581, tplpd_s: 1.042257, tplbi_f: 0.776357, tplbi_s: 1.008519 },
        "106": { modb_f: 1.035099, modb_s: 0.942035, modc_f: 0.994652, modc_s: 0.953632, tplpd_f: 1.197052, tplpd_s: 1.049382, tplbi_f: 0.824984, tplbi_s: 0.974080 },
        "108": { modb_f: 1.025408, modb_s: 0.961321, modc_f: 1.042100, modc_s: 0.931303, tplpd_f: 1.114275, tplpd_s: 1.026600, tplbi_f: 0.909557, tplbi_s: 0.946124 },
        "110": { modb_f: 1.023383, modb_s: 0.930005, modc_f: 1.016369, modc_s: 0.968178, tplpd_f: 1.161286, tplpd_s: 1.039993, tplbi_f: 0.776357, tplbi_s: 1.036956 },
        "111": { modb_f: 1.039930, modb_s: 0.917017, modc_f: 0.994511, modc_s: 0.939970, tplpd_f: 1.193324, tplpd_s: 1.007599, tplbi_f: 0.824984, tplbi_s: 0.967169 },
        "112": { modb_f: 1.026500, modb_s: 0.938475, modc_f: 0.993428, modc_s: 0.939891, tplpd_f: 1.160080, tplpd_s: 1.034313, tplbi_f: 0.776357, tplbi_s: 0.980180 },
        "114": { modb_f: 1.078610, modb_s: 0.903482, modc_f: 0.982240, modc_s: 0.924429, tplpd_f: 1.220450, tplpd_s: 1.031236, tplbi_f: 0.776357, tplbi_s: 0.984770 },
        "115": { modb_f: 1.042834, modb_s: 0.926879, modc_f: 1.008891, modc_s: 0.915180, tplpd_f: 1.201597, tplpd_s: 1.031612, tplbi_f: 0.776357, tplbi_s: 0.962909 },
        "116": { modb_f: 1.053398, modb_s: 0.959831, modc_f: 1.035776, modc_s: 0.958846, tplpd_f: 1.201875, tplpd_s: 1.026832, tplbi_f: 0.909557, tplbi_s: 0.948552 },
        "200": { modb_f: 1.126600, modb_s: 0.945307, modc_f: 1.024557, modc_s: 0.970319, tplpd_f: 1.208157, tplpd_s: 1.015893, tplbi_f: 0.824984, tplbi_s: 0.910447 },
        "201": { modb_f: 1.102254, modb_s: 0.957908, modc_f: 1.030326, modc_s: 0.969108, tplpd_f: 1.234068, tplpd_s: 0.999819, tplbi_f: 0.909557, tplbi_s: 0.887242 },
        "202": { modb_f: 1.095162, modb_s: 0.955395, modc_f: 1.026190, modc_s: 0.954281, tplpd_f: 1.178590, tplpd_s: 1.001496, tplbi_f: 0.776357, tplbi_s: 0.908947 },
        "203": { modb_f: 1.115145, modb_s: 0.942459, modc_f: 1.027760, modc_s: 0.941689, tplpd_f: 1.192244, tplpd_s: 1.009429, tplbi_f: 0.776357, tplbi_s: 0.911557 },
        "204": { modb_f: 1.173408, modb_s: 0.948025, modc_f: 1.005189, modc_s: 0.950301, tplpd_f: 1.218007, tplpd_s: 1.017397, tplbi_f: 0.824984, tplbi_s: 0.958542 },
        "205": { modb_f: 1.089121, modb_s: 0.949472, modc_f: 1.043861, modc_s: 0.960786, tplpd_f: 1.200457, tplpd_s: 1.019072, tplbi_f: 0.824984, tplbi_s: 0.969877 },
        "206": { modb_f: 1.107902, modb_s: 0.939539, modc_f: 0.999117, modc_s: 0.948576, tplpd_f: 1.182284, tplpd_s: 1.026757, tplbi_f: 0.776357, tplbi_s: 0.935309 },
        "207": { modb_f: 1.102330, modb_s: 0.929679, modc_f: 1.004068, modc_s: 0.946892, tplpd_f: 1.193121, tplpd_s: 1.022503, tplbi_f: 0.776357, tplbi_s: 0.953022 },
        "208": { modb_f: 1.072842, modb_s: 0.936954, modc_f: 1.003698, modc_s: 0.950296, tplpd_f: 1.162387, tplpd_s: 1.017146, tplbi_f: 0.776357, tplbi_s: 0.963954 },
        "209": { modb_f: 1.004032, modb_s: 1.015757, modc_f: 0.906038, modc_s: 1.044798, tplpd_f: 0.828234, tplpd_s: 0.947866, tplbi_f: 0.776357, tplbi_s: 1.018211 },
        "210": { modb_f: 1.016488, modb_s: 1.014087, modc_f: 0.904180, modc_s: 1.044798, tplpd_f: 0.823345, tplpd_s: 0.948677, tplbi_f: 0.776357, tplbi_s: 1.018211 },
        "211": { modb_f: 0.990445, modb_s: 1.011026, modc_f: 0.917303, modc_s: 1.048188, tplpd_f: 0.844559, tplpd_s: 0.947430, tplbi_f: 0.776357, tplbi_s: 1.009310 },
        "212": { modb_f: 1.014290, modb_s: 1.014087, modc_f: 0.903824, modc_s: 1.044798, tplpd_f: 0.821138, tplpd_s: 0.948677, tplbi_f: 0.776357, tplbi_s: 1.018211 },
        "220": { modb_f: 1.032187, modb_s: 0.964167, modc_f: 1.061658, modc_s: 0.954681, tplpd_f: 1.067562, tplpd_s: 1.007889, tplbi_f: 0.824984, tplbi_s: 0.949846 },
        "221": { modb_f: 1.062411, modb_s: 0.920545, modc_f: 1.040157, modc_s: 0.933838, tplpd_f: 1.194817, tplpd_s: 1.029165, tplbi_f: 0.824984, tplbi_s: 0.927695 },
        "222": { modb_f: 1.052905, modb_s: 0.940280, modc_f: 1.023023, modc_s: 0.958877, tplpd_f: 1.192988, tplpd_s: 1.030246, tplbi_f: 0.824984, tplbi_s: 0.951532 },
        "223": { modb_f: 1.028403, modb_s: 0.967032, modc_f: 1.025365, modc_s: 0.977241, tplpd_f: 1.173054, tplpd_s: 1.013586, tplbi_f: 0.909557, tplbi_s: 0.959516 },
        "224": { modb_f: 1.064858, modb_s: 0.958818, modc_f: 1.035063, modc_s: 0.968052, tplpd_f: 1.201011, tplpd_s: 1.002268, tplbi_f: 0.909557, tplbi_s: 0.924239 },
        "226": { modb_f: 1.047010, modb_s: 0.952197, modc_f: 1.028958, modc_s: 0.964631, tplpd_f: 1.189229, tplpd_s: 1.015733, tplbi_f: 0.909557, tplbi_s: 0.951340 },
        "227": { modb_f: 1.031866, modb_s: 0.964022, modc_f: 1.022900, modc_s: 0.977583, tplpd_f: 1.172632, tplpd_s: 1.008670, tplbi_f: 0.909557, tplbi_s: 0.956145 },
        "228": { modb_f: 1.023934, modb_s: 0.962878, modc_f: 1.014669, modc_s: 0.985715, tplpd_f: 1.192706, tplpd_s: 1.017786, tplbi_f: 0.909557, tplbi_s: 0.948059 },
        "231": { modb_f: 1.055321, modb_s: 0.976296, modc_f: 1.060856, modc_s: 0.982666, tplpd_f: 1.203719, tplpd_s: 1.019092, tplbi_f: 0.824984, tplbi_s: 0.926665 },
        "232": { modb_f: 1.018001, modb_s: 0.969260, modc_f: 1.018804, modc_s: 0.981933, tplpd_f: 1.162059, tplpd_s: 1.008761, tplbi_f: 0.909557, tplbi_s: 0.977600 },
        "233": { modb_f: 1.008479, modb_s: 0.989033, modc_f: 1.024418, modc_s: 0.997595, tplpd_f: 1.143122, tplpd_s: 0.995759, tplbi_f: 0.909557, tplbi_s: 0.961722 },
        "234": { modb_f: 1.044049, modb_s: 0.959029, modc_f: 1.043950, modc_s: 0.987670, tplpd_f: 1.156817, tplpd_s: 1.022594, tplbi_f: 0.824984, tplbi_s: 0.994055 },
        "235": { modb_f: 1.074055, modb_s: 0.955025, modc_f: 1.061506, modc_s: 0.956509, tplpd_f: 1.110033, tplpd_s: 0.986693, tplbi_f: 0.824984, tplbi_s: 0.986965 },
        "236": { modb_f: 1.039714, modb_s: 0.965368, modc_f: 1.080099, modc_s: 0.976871, tplpd_f: 1.063107, tplpd_s: 1.002443, tplbi_f: 0.824984, tplbi_s: 1.009005 },
        "237": { modb_f: 1.037854, modb_s: 0.984366, modc_f: 1.068384, modc_s: 0.999871, tplpd_f: 1.105332, tplpd_s: 1.011632, tplbi_f: 0.909557, tplbi_s: 0.925124 },
        "238": { modb_f: 1.006292, modb_s: 0.979635, modc_f: 1.058618, modc_s: 0.975730, tplpd_f: 1.056569, tplpd_s: 1.025103, tplbi_f: 0.824984, tplbi_s: 0.915933 },
        "239": { modb_f: 1.059977, modb_s: 0.994915, modc_f: 1.094005, modc_s: 0.992174, tplpd_f: 1.121554, tplpd_s: 1.003954, tplbi_f: 0.909557, tplbi_s: 0.912544 },
        "241": { modb_f: 0.974584, modb_s: 0.991545, modc_f: 0.992252, modc_s: 0.923044, tplpd_f: 1.062140, tplpd_s: 1.030138, tplbi_f: 0.776357, tplbi_s: 1.007995 },
        "242": { modb_f: 1.020891, modb_s: 0.964889, modc_f: 1.048307, modc_s: 0.947040, tplpd_f: 1.071765, tplpd_s: 1.020545, tplbi_f: 0.824984, tplbi_s: 0.965361 },
        "243": { modb_f: 1.015988, modb_s: 0.968488, modc_f: 1.072353, modc_s: 0.956327, tplpd_f: 1.102479, tplpd_s: 1.035109, tplbi_f: 0.824984, tplbi_s: 0.939540 },
        "244": { modb_f: 1.007622, modb_s: 0.983543, modc_f: 1.073056, modc_s: 0.987577, tplpd_f: 1.145725, tplpd_s: 1.035918, tplbi_f: 0.824984, tplbi_s: 0.888776 },
        "247": { modb_f: 1.005887, modb_s: 0.948315, modc_f: 1.006487, modc_s: 0.944831, tplpd_f: 1.098223, tplpd_s: 1.031700, tplbi_f: 0.776357, tplbi_s: 0.926178 },
        "248": { modb_f: 0.980347, modb_s: 0.960434, modc_f: 1.037496, modc_s: 0.939089, tplpd_f: 1.097773, tplpd_s: 1.039155, tplbi_f: 0.824984, tplbi_s: 0.938526 },
        "249": { modb_f: 1.012404, modb_s: 0.964195, modc_f: 1.022965, modc_s: 0.972214, tplpd_f: 1.151616, tplpd_s: 1.046042, tplbi_f: 0.824984, tplbi_s: 0.921876 },
        "251": { modb_f: 1.012701, modb_s: 0.962562, modc_f: 1.048944, modc_s: 0.979896, tplpd_f: 1.155841, tplpd_s: 1.064148, tplbi_f: 0.776357, tplbi_s: 0.908784 },
        "252": { modb_f: 1.037479, modb_s: 0.939168, modc_f: 1.009930, modc_s: 0.956336, tplpd_f: 1.151464, tplpd_s: 1.034668, tplbi_f: 0.776357, tplbi_s: 0.954965 },
        "253": { modb_f: 1.052537, modb_s: 0.935958, modc_f: 1.006072, modc_s: 0.956287, tplpd_f: 1.113105, tplpd_s: 1.027159, tplbi_f: 0.776357, tplbi_s: 0.959739 },
        "260": { modb_f: 0.953492, modb_s: 1.003128, modc_f: 0.988602, modc_s: 0.998308, tplpd_f: 1.131818, tplpd_s: 0.962271, tplbi_f: 1.127716, tplbi_s: 0.980356 },
        "261": { modb_f: 1.002446, modb_s: 0.983140, modc_f: 1.007472, modc_s: 0.996529, tplpd_f: 1.154264, tplpd_s: 1.005604, tplbi_f: 0.909557, tplbi_s: 0.999410 },
        "262": { modb_f: 0.989003, modb_s: 0.988768, modc_f: 1.002244, modc_s: 0.995651, tplpd_f: 1.157247, tplpd_s: 0.984678, tplbi_f: 1.000756, tplbi_s: 1.018956 },
        "263": { modb_f: 0.963417, modb_s: 1.005892, modc_f: 0.984964, modc_s: 1.017574, tplpd_f: 1.136060, tplpd_s: 0.983017, tplbi_f: 1.066024, tplbi_s: 1.013134 },
        "264": { modb_f: 0.975192, modb_s: 0.996551, modc_f: 0.990614, modc_s: 1.005744, tplpd_f: 1.150964, tplpd_s: 0.971297, tplbi_f: 1.127716, tplbi_s: 0.955493 },
        "265": { modb_f: 0.931180, modb_s: 1.025054, modc_f: 0.968236, modc_s: 1.038853, tplpd_f: 1.145009, tplpd_s: 0.960263, tplbi_f: 1.066024, tplbi_s: 0.991756 },
        "266": { modb_f: 0.943227, modb_s: 1.016644, modc_f: 0.982452, modc_s: 1.030933, tplpd_f: 1.119929, tplpd_s: 0.972053, tplbi_f: 1.066024, tplbi_s: 1.008726 },
        "267": { modb_f: 0.930629, modb_s: 1.017398, modc_f: 0.979394, modc_s: 1.042232, tplpd_f: 1.100108, tplpd_s: 0.975327, tplbi_f: 1.066024, tplbi_s: 1.005587 },
        "268": { modb_f: 0.932902, modb_s: 1.021052, modc_f: 0.959536, modc_s: 1.045281, tplpd_f: 1.103453, tplpd_s: 0.970652, tplbi_f: 1.127716, tplbi_s: 0.969166 },
        "269": { modb_f: 0.923903, modb_s: 1.027486, modc_f: 0.963639, modc_s: 1.056344, tplpd_f: 1.106418, tplpd_s: 0.957244, tplbi_f: 1.127716, tplbi_s: 0.975996 },
        "270": { modb_f: 0.903332, modb_s: 1.027169, modc_f: 0.968060, modc_s: 1.045323, tplpd_f: 1.099074, tplpd_s: 0.960563, tplbi_f: 1.127716, tplbi_s: 1.021061 },
        "272": { modb_f: 0.925947, modb_s: 1.021110, modc_f: 0.978226, modc_s: 1.040458, tplpd_f: 1.101230, tplpd_s: 0.976402, tplbi_f: 1.066024, tplbi_s: 1.014489 },
        "300": { modb_f: 0.945876, modb_s: 0.988437, modc_f: 0.956384, modc_s: 1.007013, tplpd_f: 0.993993, tplpd_s: 0.952746, tplbi_f: 0.824984, tplbi_s: 0.945137 },
        "302": { modb_f: 0.918572, modb_s: 1.011615, modc_f: 0.976076, modc_s: 1.000800, tplpd_f: 1.068450, tplpd_s: 0.970687, tplbi_f: 0.824984, tplbi_s: 0.890383 },
        "303": { modb_f: 0.950636, modb_s: 1.044545, modc_f: 1.035710, modc_s: 1.023398, tplpd_f: 1.100484, tplpd_s: 0.991245, tplbi_f: 0.909557, tplbi_s: 0.877457 },
        "304": { modb_f: 0.975413, modb_s: 1.022521, modc_f: 1.025025, modc_s: 1.020810, tplpd_f: 1.077872, tplpd_s: 0.976897, tplbi_f: 0.909557, tplbi_s: 0.903160 },
        "305": { modb_f: 0.945275, modb_s: 1.030546, modc_f: 1.014373, modc_s: 1.021964, tplpd_f: 1.069165, tplpd_s: 0.985784, tplbi_f: 0.909557, tplbi_s: 0.894506 },
        "306": { modb_f: 0.973806, modb_s: 1.012960, modc_f: 1.015244, modc_s: 1.025048, tplpd_f: 1.033792, tplpd_s: 0.999965, tplbi_f: 0.824984, tplbi_s: 0.902949 },
        "307": { modb_f: 0.936863, modb_s: 1.014960, modc_f: 0.986480, modc_s: 1.018899, tplpd_f: 1.022945, tplpd_s: 0.991212, tplbi_f: 0.824984, tplbi_s: 0.881558 },
        "308": { modb_f: 0.924548, modb_s: 1.005457, modc_f: 0.964403, modc_s: 1.020215, tplpd_f: 1.014744, tplpd_s: 0.978844, tplbi_f: 0.824984, tplbi_s: 0.891078 },
        "310": { modb_f: 0.933004, modb_s: 1.022394, modc_f: 0.979262, modc_s: 1.039382, tplpd_f: 0.992862, tplpd_s: 0.980091, tplbi_f: 0.824984, tplbi_s: 0.909373 },
        "311": { modb_f: 0.966604, modb_s: 1.018155, modc_f: 0.971306, modc_s: 1.035104, tplpd_f: 0.982089, tplpd_s: 0.983255, tplbi_f: 0.824984, tplbi_s: 0.905139 },
        "312": { modb_f: 0.957241, modb_s: 1.018257, modc_f: 0.983832, modc_s: 1.031064, tplpd_f: 0.998627, tplpd_s: 0.991396, tplbi_f: 0.824984, tplbi_s: 0.913112 },
        "313": { modb_f: 0.984952, modb_s: 1.012463, modc_f: 0.993087, modc_s: 1.023548, tplpd_f: 1.007921, tplpd_s: 0.994370, tplbi_f: 0.824984, tplbi_s: 0.909600 },
        "314": { modb_f: 0.951139, modb_s: 1.017708, modc_f: 0.968340, modc_s: 1.042705, tplpd_f: 0.980065, tplpd_s: 0.980033, tplbi_f: 0.824984, tplbi_s: 0.904934 },
        "315": { modb_f: 0.938320, modb_s: 1.010732, modc_f: 0.964728, modc_s: 1.037198, tplpd_f: 0.987867, tplpd_s: 0.980814, tplbi_f: 0.824984, tplbi_s: 0.897226 },
        "320": { modb_f: 1.061547, modb_s: 1.045184, modc_f: 1.092684, modc_s: 0.984224, tplpd_f: 1.161226, tplpd_s: 0.971179, tplbi_f: 1.000756, tplbi_s: 0.814380 },
        "324": { modb_f: 1.033496, modb_s: 1.005646, modc_f: 1.117696, modc_s: 0.968318, tplpd_f: 1.129573, tplpd_s: 0.971350, tplbi_f: 1.000756, tplbi_s: 0.830691 },
        "325": { modb_f: 1.012915, modb_s: 1.017976, modc_f: 1.058206, modc_s: 1.018654, tplpd_f: 1.094943, tplpd_s: 0.998373, tplbi_f: 0.909557, tplbi_s: 0.914922 },
        "326": { modb_f: 0.988829, modb_s: 1.058554, modc_f: 1.059214, modc_s: 1.007694, tplpd_f: 1.094293, tplpd_s: 0.995307, tplbi_f: 0.909557, tplbi_s: 0.851453 },
        "327": { modb_f: 0.949889, modb_s: 1.058225, modc_f: 1.043944, modc_s: 1.012666, tplpd_f: 1.047807, tplpd_s: 0.991153, tplbi_f: 1.000756, tplbi_s: 0.850265 },
        "328": { modb_f: 0.977670, modb_s: 1.058369, modc_f: 1.057811, modc_s: 1.019855, tplpd_f: 1.071355, tplpd_s: 1.002092, tplbi_f: 0.909557, tplbi_s: 0.800827 },
        "330": { modb_f: 1.049785, modb_s: 1.013476, modc_f: 1.083267, modc_s: 0.975312, tplpd_f: 1.144931, tplpd_s: 0.999462, tplbi_f: 0.909557, tplbi_s: 0.802251 },
        "333": { modb_f: 1.034271, modb_s: 0.995680, modc_f: 1.097342, modc_s: 0.971103, tplpd_f: 1.089075, tplpd_s: 1.007000, tplbi_f: 0.909557, tplbi_s: 0.873607 },
        "334": { modb_f: 1.070760, modb_s: 0.998127, modc_f: 1.094522, modc_s: 0.988254, tplpd_f: 1.137281, tplpd_s: 0.983840, tplbi_f: 0.909557, tplbi_s: 0.831320 },
        "335": { modb_f: 1.035489, modb_s: 1.001000, modc_f: 1.072728, modc_s: 1.010010, tplpd_f: 1.094884, tplpd_s: 1.002010, tplbi_f: 0.909557, tplbi_s: 0.871975 },
        "336": { modb_f: 1.012545, modb_s: 1.002804, modc_f: 1.030929, modc_s: 1.011543, tplpd_f: 1.077461, tplpd_s: 1.002689, tplbi_f: 0.909557, tplbi_s: 0.915103 },
        "337": { modb_f: 1.007152, modb_s: 1.039350, modc_f: 1.053021, modc_s: 1.035617, tplpd_f: 1.081785, tplpd_s: 1.013970, tplbi_f: 0.824984, tplbi_s: 0.820648 },
        "338": { modb_f: 1.031831, modb_s: 1.015599, modc_f: 1.053700, modc_s: 1.022304, tplpd_f: 1.038178, tplpd_s: 1.006287, tplbi_f: 0.909557, tplbi_s: 0.885419 },
        "350": { modb_f: 0.950421, modb_s: 1.022847, modc_f: 0.961408, modc_s: 1.095764, tplpd_f: 1.007967, tplpd_s: 0.982981, tplbi_f: 0.909557, tplbi_s: 0.898366 },
        "351": { modb_f: 0.917428, modb_s: 0.992639, modc_f: 0.955607, modc_s: 1.053576, tplpd_f: 1.003077, tplpd_s: 0.984493, tplbi_f: 0.909557, tplbi_s: 0.884615 },
        "352": { modb_f: 0.947451, modb_s: 1.011349, modc_f: 0.960513, modc_s: 1.042754, tplpd_f: 0.973099, tplpd_s: 0.974794, tplbi_f: 0.909557, tplbi_s: 0.902002 },
        "353": { modb_f: 0.956491, modb_s: 1.013854, modc_f: 0.963694, modc_s: 1.037089, tplpd_f: 0.976287, tplpd_s: 0.977922, tplbi_f: 0.909557, tplbi_s: 0.906067 },
        "354": { modb_f: 0.965561, modb_s: 1.015313, modc_f: 0.953225, modc_s: 1.038748, tplpd_f: 0.953768, tplpd_s: 0.970962, tplbi_f: 0.909557, tplbi_s: 0.905527 },
        "356": { modb_f: 0.960290, modb_s: 1.024134, modc_f: 0.932733, modc_s: 1.086004, tplpd_f: 0.957511, tplpd_s: 0.974811, tplbi_f: 0.909557, tplbi_s: 0.973277 },
        "357": { modb_f: 0.955315, modb_s: 1.014791, modc_f: 0.912671, modc_s: 1.079701, tplpd_f: 0.897893, tplpd_s: 0.977112, tplbi_f: 0.909557, tplbi_s: 0.962998 },
        "358": { modb_f: 0.950589, modb_s: 1.014927, modc_f: 0.905697, modc_s: 1.080563, tplpd_f: 0.904642, tplpd_s: 0.979763, tplbi_f: 1.000756, tplbi_s: 0.920105 },
        "360": { modb_f: 0.978031, modb_s: 1.023892, modc_f: 0.914862, modc_s: 1.059293, tplpd_f: 0.964081, tplpd_s: 0.977810, tplbi_f: 0.909557, tplbi_s: 0.972712 },
        "361": { modb_f: 0.946960, modb_s: 1.022478, modc_f: 0.947450, modc_s: 1.063553, tplpd_f: 0.965663, tplpd_s: 0.975809, tplbi_f: 0.909557, tplbi_s: 0.940637 },
        "362": { modb_f: 0.957783, modb_s: 1.015997, modc_f: 0.939499, modc_s: 1.053215, tplpd_f: 0.948384, tplpd_s: 0.970103, tplbi_f: 0.909557, tplbi_s: 0.917830 },
        "363": { modb_f: 0.969582, modb_s: 1.014948, modc_f: 0.930025, modc_s: 1.051835, tplpd_f: 0.920213, tplpd_s: 0.969140, tplbi_f: 0.909557, tplbi_s: 0.930662 },
        "364": { modb_f: 0.972851, modb_s: 1.009139, modc_f: 0.943957, modc_s: 1.036453, tplpd_f: 0.942599, tplpd_s: 0.970969, tplbi_f: 0.909557, tplbi_s: 0.901971 },
        "365": { modb_f: 0.975416, modb_s: 1.011372, modc_f: 0.955064, modc_s: 1.038318, tplpd_f: 0.971303, tplpd_s: 0.973828, tplbi_f: 0.909557, tplbi_s: 0.899084 },
        "366": { modb_f: 0.970388, modb_s: 1.015407, modc_f: 0.928443, modc_s: 1.048640, tplpd_f: 0.924036, tplpd_s: 0.978078, tplbi_f: 0.909557, tplbi_s: 0.921290 },
        "367": { modb_f: 0.983979, modb_s: 1.005615, modc_f: 0.944416, modc_s: 1.027518, tplpd_f: 0.935910, tplpd_s: 0.975164, tplbi_f: 0.909557, tplbi_s: 0.903018 },
        "368": { modb_f: 0.968405, modb_s: 1.018035, modc_f: 0.926113, modc_s: 1.064946, tplpd_f: 0.930822, tplpd_s: 0.974972, tplbi_f: 0.909557, tplbi_s: 0.957099 },
        "369": { modb_f: 1.003542, modb_s: 1.000569, modc_f: 0.969519, modc_s: 1.007433, tplpd_f: 0.953151, tplpd_s: 0.972103, tplbi_f: 0.909557, tplbi_s: 0.892934 },
        "400": { modb_f: 1.029177, modb_s: 0.982819, modc_f: 1.076230, modc_s: 0.952702, tplpd_f: 1.102708, tplpd_s: 0.931965, tplbi_f: 1.204364, tplbi_s: 0.840173 },
        "401": { modb_f: 1.034700, modb_s: 0.996702, modc_f: 1.073951, modc_s: 0.970957, tplpd_f: 1.100400, tplpd_s: 0.941824, tplbi_f: 1.204364, tplbi_s: 0.891850 },
        "402": { modb_f: 1.036043, modb_s: 0.984852, modc_f: 1.049616, modc_s: 0.952664, tplpd_f: 1.091787, tplpd_s: 0.940750, tplbi_f: 1.204364, tplbi_s: 0.837722 },
        "403": { modb_f: 1.043327, modb_s: 0.976945, modc_f: 1.074411, modc_s: 0.982434, tplpd_f: 1.114697, tplpd_s: 0.941178, tplbi_f: 1.127716, tplbi_s: 0.868588 },
        "404": { modb_f: 1.042406, modb_s: 0.978179, modc_f: 1.112157, modc_s: 0.975878, tplpd_f: 1.136611, tplpd_s: 0.926618, tplbi_f: 1.204364, tplbi_s: 0.876193 },
        "406": { modb_f: 1.027024, modb_s: 0.992086, modc_f: 1.089580, modc_s: 1.002579, tplpd_f: 1.111943, tplpd_s: 0.964699, tplbi_f: 1.127716, tplbi_s: 0.896987 },
        "407": { modb_f: 1.034774, modb_s: 0.978779, modc_f: 1.082466, modc_s: 0.952565, tplpd_f: 1.084861, tplpd_s: 0.935941, tplbi_f: 1.127716, tplbi_s: 0.788307 },
        "408": { modb_f: 0.994610, modb_s: 0.994178, modc_f: 1.050624, modc_s: 0.979592, tplpd_f: 1.094191, tplpd_s: 0.942206, tplbi_f: 1.127716, tplbi_s: 0.819164 },
        "411": { modb_f: 1.024336, modb_s: 1.005164, modc_f: 1.075826, modc_s: 0.980502, tplpd_f: 1.058851, tplpd_s: 0.937295, tplbi_f: 1.127716, tplbi_s: 0.925870 },
        "412": { modb_f: 0.985694, modb_s: 0.994292, modc_f: 1.062498, modc_s: 0.964294, tplpd_f: 1.028451, tplpd_s: 0.921555, tplbi_f: 1.127716, tplbi_s: 0.942298 },
        "413": { modb_f: 1.026955, modb_s: 1.028171, modc_f: 1.021695, modc_s: 1.005097, tplpd_f: 1.005609, tplpd_s: 0.947770, tplbi_f: 1.066024, tplbi_s: 0.944664 },
        "414": { modb_f: 1.005575, modb_s: 1.008237, modc_f: 1.045891, modc_s: 1.002958, tplpd_f: 1.018287, tplpd_s: 0.959270, tplbi_f: 1.127716, tplbi_s: 0.953311 },
        "420": { modb_f: 1.030506, modb_s: 0.991979, modc_f: 1.048995, modc_s: 0.979630, tplpd_f: 1.001329, tplpd_s: 0.975084, tplbi_f: 1.000756, tplbi_s: 0.954660 },
        "421": { modb_f: 0.991620, modb_s: 0.996271, modc_f: 0.982144, modc_s: 0.999020, tplpd_f: 0.944396, tplpd_s: 0.969379, tplbi_f: 0.909557, tplbi_s: 0.880827 },
        "422": { modb_f: 1.015121, modb_s: 0.995402, modc_f: 1.007765, modc_s: 1.005538, tplpd_f: 0.992643, tplpd_s: 0.967311, tplbi_f: 1.000756, tplbi_s: 0.892540 },
        "423": { modb_f: 1.031498, modb_s: 0.999570, modc_f: 0.990678, modc_s: 0.976168, tplpd_f: 0.971570, tplpd_s: 0.958656, tplbi_f: 0.909557, tplbi_s: 0.846888 },
        "424": { modb_f: 0.996896, modb_s: 1.006788, modc_f: 0.939724, modc_s: 1.022804, tplpd_f: 1.017279, tplpd_s: 0.970069, tplbi_f: 0.909557, tplbi_s: 0.869268 },
        "426": { modb_f: 1.005360, modb_s: 1.005004, modc_f: 1.027038, modc_s: 0.995157, tplpd_f: 1.004148, tplpd_s: 0.953427, tplbi_f: 1.000756, tplbi_s: 0.877681 },
        "427": { modb_f: 1.010047, modb_s: 0.982435, modc_f: 1.075908, modc_s: 1.000635, tplpd_f: 1.034471, tplpd_s: 0.965258, tplbi_f: 1.127716, tplbi_s: 0.901904 },
        "428": { modb_f: 1.022411, modb_s: 0.987154, modc_f: 1.057035, modc_s: 1.000316, tplpd_f: 1.052161, tplpd_s: 0.941970, tplbi_f: 1.127716, tplbi_s: 0.866997 },
        "429": { modb_f: 1.003684, modb_s: 0.994471, modc_f: 1.014554, modc_s: 0.990968, tplpd_f: 0.981227, tplpd_s: 0.957977, tplbi_f: 1.066024, tplbi_s: 0.919924 },
        "432": { modb_f: 0.998971, modb_s: 1.013757, modc_f: 1.015566, modc_s: 0.986322, tplpd_f: 0.994161, tplpd_s: 0.936421, tplbi_f: 1.066024, tplbi_s: 0.905373 },
        "433": { modb_f: 1.007920, modb_s: 1.015884, modc_f: 1.025301, modc_s: 0.998931, tplpd_f: 1.004760, tplpd_s: 0.945361, tplbi_f: 1.066024, tplbi_s: 0.930032 },
        "434": { modb_f: 0.986252, modb_s: 1.011575, modc_f: 0.981299, modc_s: 1.036199, tplpd_f: 1.026999, tplpd_s: 0.932698, tplbi_f: 1.000756, tplbi_s: 0.977549 },
        "435": { modb_f: 0.974884, modb_s: 1.022845, modc_f: 0.974651, modc_s: 1.020513, tplpd_f: 0.998979, tplpd_s: 0.945719, tplbi_f: 1.066024, tplbi_s: 0.958857 },
        "436": { modb_f: 0.990655, modb_s: 1.006472, modc_f: 0.986625, modc_s: 1.024340, tplpd_f: 0.999866, tplpd_s: 0.952734, tplbi_f: 1.066024, tplbi_s: 0.993632 },
        "437": { modb_f: 0.957127, modb_s: 1.017452, modc_f: 0.917892, modc_s: 1.051417, tplpd_f: 0.920609, tplpd_s: 0.966306, tplbi_f: 1.000756, tplbi_s: 0.926618 },
        "438": { modb_f: 0.986041, modb_s: 1.002169, modc_f: 0.964935, modc_s: 1.028876, tplpd_f: 0.948495, tplpd_s: 0.961740, tplbi_f: 1.000756, tplbi_s: 0.923853 },
        "439": { modb_f: 0.962810, modb_s: 1.013860, modc_f: 0.940934, modc_s: 1.047742, tplpd_f: 0.932222, tplpd_s: 0.960870, tplbi_f: 1.000756, tplbi_s: 0.940825 },
        "500": { modb_f: 1.009415, modb_s: 1.033426, modc_f: 1.014984, modc_s: 0.992457, tplpd_f: 1.000275, tplpd_s: 0.943510, tplbi_f: 1.204364, tplbi_s: 0.879050 },
        "502": { modb_f: 1.000327, modb_s: 1.024790, modc_f: 1.010656, modc_s: 1.009310, tplpd_f: 0.958102, tplpd_s: 0.956167, tplbi_f: 1.066024, tplbi_s: 0.948903 },
        "503": { modb_f: 1.002412, modb_s: 1.040081, modc_f: 0.999430, modc_s: 1.017522, tplpd_f: 0.987562, tplpd_s: 0.941658, tplbi_f: 1.127716, tplbi_s: 0.895095 },
        "504": { modb_f: 0.965209, modb_s: 1.064572, modc_f: 0.970516, modc_s: 1.034158, tplpd_f: 0.955708, tplpd_s: 0.948423, tplbi_f: 1.204364, tplbi_s: 0.971060 },
        "505": { modb_f: 0.944342, modb_s: 1.053521, modc_f: 0.968665, modc_s: 1.061305, tplpd_f: 0.933390, tplpd_s: 0.953439, tplbi_f: 1.127716, tplbi_s: 0.956211 },
        "506": { modb_f: 0.948071, modb_s: 1.061406, modc_f: 0.964623, modc_s: 1.076516, tplpd_f: 0.966074, tplpd_s: 0.955681, tplbi_f: 1.127716, tplbi_s: 1.025589 },
        "507": { modb_f: 0.973376, modb_s: 1.040795, modc_f: 0.974391, modc_s: 1.037059, tplpd_f: 0.956775, tplpd_s: 0.947038, tplbi_f: 1.127716, tplbi_s: 1.026947 },
        "508": { modb_f: 0.976897, modb_s: 1.053692, modc_f: 0.990434, modc_s: 1.003407, tplpd_f: 0.961608, tplpd_s: 0.926114, tplbi_f: 1.127716, tplbi_s: 0.953373 },
        "509": { modb_f: 0.989133, modb_s: 1.029381, modc_f: 1.000187, modc_s: 1.024808, tplpd_f: 0.962416, tplpd_s: 0.938325, tplbi_f: 1.066024, tplbi_s: 0.953862 },
        "510": { modb_f: 0.962363, modb_s: 1.041782, modc_f: 0.977952, modc_s: 0.992160, tplpd_f: 0.946086, tplpd_s: 0.960709, tplbi_f: 1.127716, tplbi_s: 0.961138 },
        "511": { modb_f: 0.961676, modb_s: 1.042811, modc_f: 0.949631, modc_s: 1.039047, tplpd_f: 0.906332, tplpd_s: 0.965158, tplbi_f: 1.000756, tplbi_s: 0.969141 },
        "512": { modb_f: 0.945056, modb_s: 1.067802, modc_f: 0.939621, modc_s: 1.042127, tplpd_f: 0.925043, tplpd_s: 0.968150, tplbi_f: 1.066024, tplbi_s: 0.992854 },
        "513": { modb_f: 0.953543, modb_s: 1.074274, modc_f: 0.951058, modc_s: 1.022577, tplpd_f: 0.927298, tplpd_s: 0.956492, tplbi_f: 1.127716, tplbi_s: 0.996635 },
        "514": { modb_f: 0.940762, modb_s: 1.074462, modc_f: 0.927607, modc_s: 1.054986, tplpd_f: 0.913287, tplpd_s: 0.966182, tplbi_f: 1.127716, tplbi_s: 1.062360 },
        "515": { modb_f: 0.981677, modb_s: 1.039116, modc_f: 0.994928, modc_s: 1.004270, tplpd_f: 0.990899, tplpd_s: 0.950470, tplbi_f: 1.127716, tplbi_s: 0.962778 },
        "516": { modb_f: 0.939756, modb_s: 1.086170, modc_f: 0.934599, modc_s: 1.076430, tplpd_f: 0.956103, tplpd_s: 0.956914, tplbi_f: 1.127716, tplbi_s: 1.070553 },
        "520": { modb_f: 0.949157, modb_s: 1.049922, modc_f: 0.913527, modc_s: 1.064251, tplpd_f: 0.892503, tplpd_s: 0.976558, tplbi_f: 1.066024, tplbi_s: 1.005564 },
        "521": { modb_f: 0.941124, modb_s: 1.075332, modc_f: 0.926912, modc_s: 1.075731, tplpd_f: 0.906561, tplpd_s: 0.969699, tplbi_f: 1.000756, tplbi_s: 1.023073 },
        "522": { modb_f: 0.936017, modb_s: 1.080542, modc_f: 0.923950, modc_s: 1.072610, tplpd_f: 0.902081, tplpd_s: 0.965007, tplbi_f: 1.066024, tplbi_s: 1.053922 },
        "523": { modb_f: 0.909950, modb_s: 1.088195, modc_f: 0.910236, modc_s: 1.093296, tplpd_f: 0.880300, tplpd_s: 0.981340, tplbi_f: 1.000756, tplbi_s: 1.110019 },
        "524": { modb_f: 0.925164, modb_s: 1.085198, modc_f: 0.902466, modc_s: 1.087196, tplpd_f: 0.869972, tplpd_s: 0.995193, tplbi_f: 1.000756, tplbi_s: 1.068253 },
        "525": { modb_f: 0.901172, modb_s: 1.104307, modc_f: 0.896602, modc_s: 1.107232, tplpd_f: 0.857895, tplpd_s: 0.998918, tplbi_f: 1.066024, tplbi_s: 1.170517 },
        "526": { modb_f: 0.904363, modb_s: 1.100817, modc_f: 0.901050, modc_s: 1.082296, tplpd_f: 0.891027, tplpd_s: 0.977813, tplbi_f: 1.066024, tplbi_s: 1.189091 },
        "527": { modb_f: 0.897355, modb_s: 1.105414, modc_f: 0.893270, modc_s: 1.093902, tplpd_f: 0.862866, tplpd_s: 0.987482, tplbi_f: 1.066024, tplbi_s: 1.155890 },
        "528": { modb_f: 0.918917, modb_s: 1.086500, modc_f: 0.914106, modc_s: 1.087411, tplpd_f: 0.895793, tplpd_s: 0.967316, tplbi_f: 1.127716, tplbi_s: 1.107609 },
        "530": { modb_f: 0.942613, modb_s: 1.075144, modc_f: 0.895541, modc_s: 1.089969, tplpd_f: 0.868517, tplpd_s: 0.998036, tplbi_f: 1.000756, tplbi_s: 1.020609 },
        "540": { modb_f: 0.972500, modb_s: 1.028494, modc_f: 0.959979, modc_s: 1.012552, tplpd_f: 0.922662, tplpd_s: 0.958619, tplbi_f: 1.066024, tplbi_s: 0.875500 },
        "541": { modb_f: 0.978714, modb_s: 1.026241, modc_f: 0.954296, modc_s: 1.043503, tplpd_f: 0.887003, tplpd_s: 0.969481, tplbi_f: 0.909557, tplbi_s: 0.930942 },
        "542": { modb_f: 1.014944, modb_s: 1.022911, modc_f: 0.989321, modc_s: 1.033781, tplpd_f: 0.928206, tplpd_s: 0.954092, tplbi_f: 1.000756, tplbi_s: 0.898526 },
        "544": { modb_f: 0.991575, modb_s: 1.019715, modc_f: 0.985111, modc_s: 1.014485, tplpd_f: 0.926877, tplpd_s: 0.963590, tplbi_f: 0.909557, tplbi_s: 0.914046 },
        "545": { modb_f: 0.946453, modb_s: 1.016099, modc_f: 0.941813, modc_s: 1.009858, tplpd_f: 0.808198, tplpd_s: 0.997031, tplbi_f: 0.776357, tplbi_s: 0.851640 },
        "546": { modb_f: 0.961942, modb_s: 1.008922, modc_f: 0.943214, modc_s: 0.973984, tplpd_f: 0.779496, tplpd_s: 1.004034, tplbi_f: 0.776357, tplbi_s: 0.855649 },
        "551": { modb_f: 0.962886, modb_s: 1.042620, modc_f: 0.928009, modc_s: 1.058222, tplpd_f: 0.884780, tplpd_s: 0.979320, tplbi_f: 1.000756, tplbi_s: 0.966999 },
        "552": { modb_f: 0.962390, modb_s: 1.031083, modc_f: 0.924851, modc_s: 1.063086, tplpd_f: 0.849954, tplpd_s: 0.984339, tplbi_f: 0.824984, tplbi_s: 0.989572 },
        "553": { modb_f: 0.981734, modb_s: 1.026946, modc_f: 0.913708, modc_s: 1.097596, tplpd_f: 0.833817, tplpd_s: 0.988379, tplbi_f: 0.776357, tplbi_s: 1.081403 },
        "555": { modb_f: 0.973985, modb_s: 1.033393, modc_f: 0.934401, modc_s: 1.043864, tplpd_f: 0.829691, tplpd_s: 0.982352, tplbi_f: 0.776357, tplbi_s: 0.957243 },
        "556": { modb_f: 1.009444, modb_s: 1.035298, modc_f: 0.881558, modc_s: 1.091948, tplpd_f: 0.802174, tplpd_s: 0.982027, tplbi_f: 0.776357, tplbi_s: 1.089532 },
        "557": { modb_f: 0.943678, modb_s: 1.077540, modc_f: 0.883402, modc_s: 1.087302, tplpd_f: 0.854469, tplpd_s: 1.015974, tplbi_f: 0.909557, tplbi_s: 1.015447 },
        "558": { modb_f: 0.964225, modb_s: 1.039588, modc_f: 0.908137, modc_s: 1.069473, tplpd_f: 0.880698, tplpd_s: 0.997491, tplbi_f: 0.909557, tplbi_s: 1.042502 },
        "600": { modb_f: 0.881944, modb_s: 1.126284, modc_f: 0.883526, modc_s: 1.069032, tplpd_f: 0.835871, tplpd_s: 1.050255, tplbi_f: 1.204364, tplbi_s: 1.054864 },
        "602": { modb_f: 0.889614, modb_s: 1.102877, modc_f: 0.864851, modc_s: 1.084909, tplpd_f: 0.789951, tplpd_s: 1.044995, tplbi_f: 1.066024, tplbi_s: 1.104512 },
        "603": { modb_f: 0.918744, modb_s: 1.106567, modc_f: 0.871642, modc_s: 1.098402, tplpd_f: 0.802420, tplpd_s: 1.026604, tplbi_f: 1.000756, tplbi_s: 1.075796 },
        "604": { modb_f: 0.895507, modb_s: 1.111476, modc_f: 0.860437, modc_s: 1.091560, tplpd_f: 0.781884, tplpd_s: 1.039464, tplbi_f: 1.066024, tplbi_s: 1.067809 },
        "605": { modb_f: 0.900385, modb_s: 1.100653, modc_f: 0.862232, modc_s: 1.088075, tplpd_f: 0.781263, tplpd_s: 1.041963, tplbi_f: 1.066024, tplbi_s: 1.084015 },
        "606": { modb_f: 0.880000, modb_s: 1.101841, modc_f: 0.871366, modc_s: 1.078599, tplpd_f: 0.811053, tplpd_s: 1.052370, tplbi_f: 1.127716, tplbi_s: 1.108747 },
        "607": { modb_f: 0.889305, modb_s: 1.091965, modc_f: 0.864939, modc_s: 1.086641, tplpd_f: 0.780970, tplpd_s: 1.049606, tplbi_f: 1.066024, tplbi_s: 1.144160 },
        "608": { modb_f: 0.869246, modb_s: 1.110862, modc_f: 0.850459, modc_s: 1.070991, tplpd_f: 0.823433, tplpd_s: 1.041076, tplbi_f: 1.127716, tplbi_s: 1.110299 },
        "611": { modb_f: 0.865548, modb_s: 1.101744, modc_f: 0.840427, modc_s: 1.090749, tplpd_f: 0.794818, tplpd_s: 1.044039, tplbi_f: 1.127716, tplbi_s: 1.185189 },
        "612": { modb_f: 0.864033, modb_s: 1.122744, modc_f: 0.862651, modc_s: 1.074567, tplpd_f: 0.784330, tplpd_s: 1.043250, tplbi_f: 1.127716, tplbi_s: 1.140469 },
        "613": { modb_f: 0.854609, modb_s: 1.110058, modc_f: 0.830525, modc_s: 1.096415, tplpd_f: 0.791633, tplpd_s: 1.048355, tplbi_f: 1.127716, tplbi_s: 1.208727 },
        "614": { modb_f: 0.849436, modb_s: 1.125757, modc_f: 0.842786, modc_s: 1.092561, tplpd_f: 0.768951, tplpd_s: 1.051276, tplbi_f: 1.066024, tplbi_s: 1.179948 },
        "615": { modb_f: 0.852836, modb_s: 1.136107, modc_f: 0.848342, modc_s: 1.097385, tplpd_f: 0.776235, tplpd_s: 1.043356, tplbi_f: 1.127716, tplbi_s: 1.172062 },
        "616": { modb_f: 0.871812, modb_s: 1.122966, modc_f: 0.859739, modc_s: 1.094443, tplpd_f: 0.789033, tplpd_s: 1.045741, tplbi_f: 1.127716, tplbi_s: 1.101165 },
        "621": { modb_f: 0.866709, modb_s: 1.126913, modc_f: 0.858871, modc_s: 1.073188, tplpd_f: 0.795632, tplpd_s: 1.042810, tplbi_f: 1.127716, tplbi_s: 1.078971 },
        "622": { modb_f: 0.873666, modb_s: 1.118317, modc_f: 0.858388, modc_s: 1.121541, tplpd_f: 0.792262, tplpd_s: 1.027262, tplbi_f: 1.127716, tplbi_s: 1.121161 },
        "623": { modb_f: 0.871864, modb_s: 1.125627, modc_f: 0.858230, modc_s: 1.107344, tplpd_f: 0.791736, tplpd_s: 1.034702, tplbi_f: 1.066024, tplbi_s: 1.107372 },
        "624": { modb_f: 0.874294, modb_s: 1.089847, modc_f: 0.836396, modc_s: 1.103754, tplpd_f: 0.775331, tplpd_s: 1.046162, tplbi_f: 1.127716, tplbi_s: 1.176691 },
        "625": { modb_f: 0.867018, modb_s: 1.093679, modc_f: 0.837463, modc_s: 1.103312, tplpd_f: 0.762139, tplpd_s: 1.048448, tplbi_f: 1.066024, tplbi_s: 1.160553 },
        "630": { modb_f: 0.878773, modb_s: 1.119642, modc_f: 0.857681, modc_s: 1.118711, tplpd_f: 0.815230, tplpd_s: 1.014119, tplbi_f: 1.066024, tplbi_s: 1.065551 },
        "631": { modb_f: 0.880377, modb_s: 1.119221, modc_f: 0.865874, modc_s: 1.127987, tplpd_f: 0.803986, tplpd_s: 1.027683, tplbi_f: 1.127716, tplbi_s: 1.090438 },
        "632": { modb_f: 0.875236, modb_s: 1.113629, modc_f: 0.893786, modc_s: 1.151719, tplpd_f: 0.840414, tplpd_s: 1.014349, tplbi_f: 1.127716, tplbi_s: 1.073578 },
        "633": { modb_f: 0.878077, modb_s: 1.113902, modc_f: 0.873810, modc_s: 1.132734, tplpd_f: 0.835672, tplpd_s: 1.022665, tplbi_f: 1.127716, tplbi_s: 1.110362 },
        "634": { modb_f: 0.872101, modb_s: 1.121986, modc_f: 0.871880, modc_s: 1.104807, tplpd_f: 0.810934, tplpd_s: 1.013250, tplbi_f: 1.066024, tplbi_s: 1.126478 },
        "635": { modb_f: 0.874756, modb_s: 1.126096, modc_f: 0.854584, modc_s: 1.097118, tplpd_f: 0.800469, tplpd_s: 1.023175, tplbi_f: 1.066024, tplbi_s: 1.141785 },
        "636": { modb_f: 0.875940, modb_s: 1.117872, modc_f: 0.856709, modc_s: 1.090319, tplpd_f: 0.791416, tplpd_s: 1.030629, tplbi_f: 1.000756, tplbi_s: 1.158210 },
        "637": { modb_f: 0.883469, modb_s: 1.118083, modc_f: 0.894664, modc_s: 1.111257, tplpd_f: 0.843357, tplpd_s: 1.009092, tplbi_f: 1.127716, tplbi_s: 1.137957 },
        "638": { modb_f: 0.901027, modb_s: 1.119832, modc_f: 0.882415, modc_s: 1.093486, tplpd_f: 0.840222, tplpd_s: 1.002552, tplbi_f: 1.000756, tplbi_s: 1.140285 },
        "640": { modb_f: 0.921286, modb_s: 1.102733, modc_f: 0.843429, modc_s: 1.104484, tplpd_f: 0.805375, tplpd_s: 1.008568, tplbi_f: 1.127716, tplbi_s: 0.976796 },
        "643": { modb_f: 0.925891, modb_s: 1.089302, modc_f: 0.872359, modc_s: 1.098341, tplpd_f: 0.849976, tplpd_s: 1.012220, tplbi_f: 1.066024, tplbi_s: 1.013984 },
        "646": { modb_f: 0.907157, modb_s: 1.104994, modc_f: 0.857497, modc_s: 1.100232, tplpd_f: 0.803774, tplpd_s: 1.024823, tplbi_f: 1.066024, tplbi_s: 1.062423 },
        "647": { modb_f: 0.906269, modb_s: 1.098477, modc_f: 0.883500, modc_s: 1.127963, tplpd_f: 0.838701, tplpd_s: 1.015602, tplbi_f: 1.066024, tplbi_s: 1.034847 },
        "648": { modb_f: 0.912814, modb_s: 1.098688, modc_f: 0.895767, modc_s: 1.143722, tplpd_f: 0.830190, tplpd_s: 1.000380, tplbi_f: 1.066024, tplbi_s: 1.144434 },
        "649": { modb_f: 0.895431, modb_s: 1.109533, modc_f: 0.878163, modc_s: 1.131306, tplpd_f: 0.825224, tplpd_s: 1.004064, tplbi_f: 1.066024, tplbi_s: 1.148798 },
        "651": { modb_f: 0.859010, modb_s: 1.142298, modc_f: 0.852027, modc_s: 1.090661, tplpd_f: 0.792906, tplpd_s: 1.033888, tplbi_f: 1.127716, tplbi_s: 1.137455 },
        "652": { modb_f: 0.845383, modb_s: 1.138141, modc_f: 0.845163, modc_s: 1.097602, tplpd_f: 0.770687, tplpd_s: 1.039677, tplbi_f: 1.204364, tplbi_s: 1.196673 },
        "653": { modb_f: 0.840116, modb_s: 1.133190, modc_f: 0.838059, modc_s: 1.089673, tplpd_f: 0.745674, tplpd_s: 1.044761, tplbi_f: 1.000756, tplbi_s: 1.200664 },
        "654": { modb_f: 0.859353, modb_s: 1.132579, modc_f: 0.845369, modc_s: 1.091302, tplpd_f: 0.787032, tplpd_s: 1.034756, tplbi_f: 1.000756, tplbi_s: 1.188844 },
        "655": { modb_f: 0.870225, modb_s: 1.127975, modc_f: 0.856639, modc_s: 1.114710, tplpd_f: 0.800094, tplpd_s: 1.027689, tplbi_f: 1.127716, tplbi_s: 1.142949 },
        "700": { modb_f: 0.961831, modb_s: 1.069131, modc_f: 0.904238, modc_s: 1.073188, tplpd_f: 0.908775, tplpd_s: 1.068558, tplbi_f: 1.204364, tplbi_s: 1.041181 },
        "701": { modb_f: 0.985473, modb_s: 1.074433, modc_f: 0.923624, modc_s: 1.078066, tplpd_f: 0.860704, tplpd_s: 1.060471, tplbi_f: 1.204364, tplbi_s: 1.053541 },
        "702": { modb_f: 0.961139, modb_s: 1.064688, modc_f: 0.894649, modc_s: 1.047879, tplpd_f: 0.877292, tplpd_s: 1.051366, tplbi_f: 1.204364, tplbi_s: 1.020593 },
        "704": { modb_f: 0.955747, modb_s: 1.058258, modc_f: 0.898693, modc_s: 1.054253, tplpd_f: 0.909076, tplpd_s: 1.053444, tplbi_f: 1.204364, tplbi_s: 1.021013 },
        "708": { modb_f: 0.967906, modb_s: 1.055666, modc_f: 0.897072, modc_s: 1.050117, tplpd_f: 0.898073, tplpd_s: 1.046593, tplbi_f: 1.204364, tplbi_s: 0.998623 },
        "709": { modb_f: 0.940935, modb_s: 1.060381, modc_f: 0.908637, modc_s: 1.051463, tplpd_f: 0.856173, tplpd_s: 1.035421, tplbi_f: 1.204364, tplbi_s: 1.012915 },
        "710": { modb_f: 0.959505, modb_s: 1.040992, modc_f: 0.912372, modc_s: 1.049272, tplpd_f: 0.826603, tplpd_s: 1.049799, tplbi_f: 1.204364, tplbi_s: 1.118900 },
        "711": { modb_f: 0.978433, modb_s: 1.045644, modc_f: 0.894703, modc_s: 1.047680, tplpd_f: 0.793792, tplpd_s: 1.041508, tplbi_f: 1.127716, tplbi_s: 1.119806 },
        "712": { modb_f: 0.932217, modb_s: 1.050144, modc_f: 0.891115, modc_s: 1.067436, tplpd_f: 0.771842, tplpd_s: 1.050428, tplbi_f: 1.066024, tplbi_s: 1.136604 },
        "713": { modb_f: 0.924901, modb_s: 1.050040, modc_f: 0.888023, modc_s: 1.077992, tplpd_f: 0.751256, tplpd_s: 1.047963, tplbi_f: 1.066024, tplbi_s: 1.156203 },
        "714": { modb_f: 0.907624, modb_s: 1.063631, modc_f: 0.870793, modc_s: 1.089139, tplpd_f: 0.735676, tplpd_s: 1.057768, tplbi_f: 1.066024, tplbi_s: 1.175285 },
        "715": { modb_f: 0.898044, modb_s: 1.083501, modc_f: 0.866335, modc_s: 1.095168, tplpd_f: 0.760926, tplpd_s: 1.051433, tplbi_f: 1.066024, tplbi_s: 1.168368 },
        "716": { modb_f: 0.903638, modb_s: 1.064735, modc_f: 0.868166, modc_s: 1.090145, tplpd_f: 0.737012, tplpd_s: 1.050977, tplbi_f: 1.066024, tplbi_s: 1.169935 },
        "717": { modb_f: 0.965162, modb_s: 1.041200, modc_f: 0.905272, modc_s: 1.052331, tplpd_f: 0.864029, tplpd_s: 1.055243, tplbi_f: 1.204364, tplbi_s: 1.054473 },
        "718": { modb_f: 0.962465, modb_s: 1.046254, modc_f: 0.899522, modc_s: 1.055277, tplpd_f: 0.774842, tplpd_s: 1.035510, tplbi_f: 1.127716, tplbi_s: 1.149798 },
        "719": { modb_f: 0.945293, modb_s: 1.038905, modc_f: 0.895930, modc_s: 1.064836, tplpd_f: 0.760412, tplpd_s: 1.039133, tplbi_f: 1.066024, tplbi_s: 1.159240 },
        "720": { modb_f: 0.887022, modb_s: 1.093184, modc_f: 0.861891, modc_s: 1.118333, tplpd_f: 0.755877, tplpd_s: 1.053604, tplbi_f: 1.204364, tplbi_s: 1.153842 },
        "721": { modb_f: 0.899776, modb_s: 1.069476, modc_f: 0.857671, modc_s: 1.087668, tplpd_f: 0.784755, tplpd_s: 1.042329, tplbi_f: 1.127716, tplbi_s: 1.121661 },
        "722": { modb_f: 0.896221, modb_s: 1.058101, modc_f: 0.873051, modc_s: 1.076080, tplpd_f: 0.790734, tplpd_s: 1.038608, tplbi_f: 1.204364, tplbi_s: 1.155257 },
        "723": { modb_f: 0.923479, modb_s: 1.067736, modc_f: 0.884310, modc_s: 1.065880, tplpd_f: 0.797720, tplpd_s: 1.046979, tplbi_f: 1.204364, tplbi_s: 1.123651 },
        "724": { modb_f: 0.927789, modb_s: 1.060613, modc_f: 0.874405, modc_s: 1.075421, tplpd_f: 0.821000, tplpd_s: 1.039335, tplbi_f: 1.204364, tplbi_s: 1.087391 },
        "725": { modb_f: 0.897179, modb_s: 1.073681, modc_f: 0.863019, modc_s: 1.076133, tplpd_f: 0.789282, tplpd_s: 1.043061, tplbi_f: 1.204364, tplbi_s: 1.136000 },
        "726": { modb_f: 0.895728, modb_s: 1.075953, modc_f: 0.849909, modc_s: 1.100567, tplpd_f: 0.778764, tplpd_s: 1.042364, tplbi_f: 1.204364, tplbi_s: 1.148526 },
        "727": { modb_f: 0.889279, modb_s: 1.078047, modc_f: 0.849549, modc_s: 1.088483, tplpd_f: 0.780217, tplpd_s: 1.044576, tplbi_f: 1.127716, tplbi_s: 1.139895 },
        "730": { modb_f: 0.856076, modb_s: 1.095939, modc_f: 0.838434, modc_s: 1.103498, tplpd_f: 0.798185, tplpd_s: 1.033522, tplbi_f: 1.204364, tplbi_s: 1.161672 },
        "731": { modb_f: 0.865986, modb_s: 1.097570, modc_f: 0.845356, modc_s: 1.090160, tplpd_f: 0.809844, tplpd_s: 1.039620, tplbi_f: 1.204364, tplbi_s: 1.145401 },
        "732": { modb_f: 0.875706, modb_s: 1.101311, modc_f: 0.857584, modc_s: 1.073964, tplpd_f: 0.805015, tplpd_s: 1.042060, tplbi_f: 1.204364, tplbi_s: 1.212209 },
        "733": { modb_f: 0.887146, modb_s: 1.094971, modc_f: 0.864583, modc_s: 1.101641, tplpd_f: 0.783817, tplpd_s: 1.038155, tplbi_f: 1.204364, tplbi_s: 1.155147 },
        "734": { modb_f: 0.893565, modb_s: 1.099503, modc_f: 0.863976, modc_s: 1.109962, tplpd_f: 0.774316, tplpd_s: 1.050543, tplbi_f: 1.127716, tplbi_s: 1.179011 },
        "735": { modb_f: 0.876699, modb_s: 1.084134, modc_f: 0.855215, modc_s: 1.108208, tplpd_f: 0.774281, tplpd_s: 1.044689, tplbi_f: 1.204364, tplbi_s: 1.151621 },
        "736": { modb_f: 0.870900, modb_s: 1.091963, modc_f: 0.851778, modc_s: 1.096565, tplpd_f: 0.782069, tplpd_s: 1.040901, tplbi_f: 1.204364, tplbi_s: 1.139309 },
        "737": { modb_f: 0.895682, modb_s: 1.086783, modc_f: 0.852971, modc_s: 1.104038, tplpd_f: 0.763434, tplpd_s: 1.042938, tplbi_f: 1.204364, tplbi_s: 1.148604 },
        "741": { modb_f: 0.884155, modb_s: 1.081311, modc_f: 0.873129, modc_s: 1.104365, tplpd_f: 0.769340, tplpd_s: 1.062248, tplbi_f: 1.204364, tplbi_s: 1.125064 },
        "742": { modb_f: 0.896066, modb_s: 1.085953, modc_f: 0.868180, modc_s: 1.106927, tplpd_f: 0.751797, tplpd_s: 1.057838, tplbi_f: 1.127716, tplbi_s: 1.158563 },
        "743": { modb_f: 0.911096, modb_s: 1.073069, modc_f: 0.882690, modc_s: 1.089740, tplpd_f: 0.756331, tplpd_s: 1.055785, tplbi_f: 1.127716, tplbi_s: 1.136706 },
        "744": { modb_f: 0.917348, modb_s: 1.080005, modc_f: 0.910619, modc_s: 1.103327, tplpd_f: 0.780221, tplpd_s: 1.058241, tplbi_f: 1.127716, tplbi_s: 1.110942 },
        "745": { modb_f: 0.927045, modb_s: 1.067819, modc_f: 0.889630, modc_s: 1.073821, tplpd_f: 0.813328, tplpd_s: 1.053281, tplbi_f: 1.204364, tplbi_s: 1.095384 },
        "800": { modb_f: 1.051467, modb_s: 1.001623, modc_f: 1.011094, modc_s: 1.012199, tplpd_f: 0.934275, tplpd_s: 1.043068, tplbi_f: 1.127716, tplbi_s: 1.164928 },
        "801": { modb_f: 1.049315, modb_s: 0.997309, modc_f: 1.012747, modc_s: 1.004696, tplpd_f: 0.893123, tplpd_s: 1.045514, tplbi_f: 1.066024, tplbi_s: 1.213866 },
        "802": { modb_f: 1.079786, modb_s: 0.996864, modc_f: 1.042049, modc_s: 1.000093, tplpd_f: 0.911081, tplpd_s: 1.026754, tplbi_f: 1.204364, tplbi_s: 1.145629 },
        "803": { modb_f: 1.077729, modb_s: 1.002904, modc_f: 1.010508, modc_s: 0.991359, tplpd_f: 0.932975, tplpd_s: 1.046028, tplbi_f: 1.204364, tplbi_s: 1.250619 },
        "804": { modb_f: 1.048398, modb_s: 0.995975, modc_f: 1.017714, modc_s: 1.019172, tplpd_f: 0.906900, tplpd_s: 1.050250, tplbi_f: 1.066024, tplbi_s: 1.182559 },
        "805": { modb_f: 1.054944, modb_s: 1.000100, modc_f: 1.000948, modc_s: 0.996439, tplpd_f: 0.878222, tplpd_s: 1.049891, tplbi_f: 1.066024, tplbi_s: 1.202899 },
        "806": { modb_f: 1.047678, modb_s: 1.011106, modc_f: 1.010219, modc_s: 0.985935, tplpd_f: 0.882785, tplpd_s: 1.054441, tplbi_f: 1.127716, tplbi_s: 1.185759 },
        "807": { modb_f: 1.061742, modb_s: 0.962051, modc_f: 1.019938, modc_s: 1.000151, tplpd_f: 0.929725, tplpd_s: 1.019544, tplbi_f: 1.127716, tplbi_s: 1.141204 },
        "811": { modb_f: 1.027356, modb_s: 1.001276, modc_f: 1.012559, modc_s: 0.994760, tplpd_f: 0.874217, tplpd_s: 1.024334, tplbi_f: 1.066024, tplbi_s: 1.124994 },
        "812": { modb_f: 1.035362, modb_s: 1.001428, modc_f: 0.998224, modc_s: 1.018802, tplpd_f: 0.825951, tplpd_s: 1.040047, tplbi_f: 1.066024, tplbi_s: 1.217323 },
        "813": { modb_f: 1.049761, modb_s: 0.981952, modc_f: 1.029777, modc_s: 1.015427, tplpd_f: 0.919597, tplpd_s: 1.031840, tplbi_f: 1.066024, tplbi_s: 1.207489 },
        "814": { modb_f: 1.038286, modb_s: 0.982181, modc_f: 1.014940, modc_s: 1.014686, tplpd_f: 0.891813, tplpd_s: 1.038060, tplbi_f: 1.127716, tplbi_s: 1.124806 },
        "815": { modb_f: 1.022148, modb_s: 1.012095, modc_f: 0.973918, modc_s: 1.017614, tplpd_f: 0.837651, tplpd_s: 1.039678, tplbi_f: 1.066024, tplbi_s: 1.170291 },
        "817": { modb_f: 0.999666, modb_s: 1.000000, tplpd_f: 0.999888, tplpd_s: 1.000000, tplbi_f: 1.000756, tplbi_s: 1.000000 },
        "820": { modb_f: 0.976307, modb_s: 1.009971, modc_f: 0.934535, modc_s: 1.027310, tplpd_f: 0.803294, tplpd_s: 1.021974, tplbi_f: 1.127716, tplbi_s: 1.206690 },
        "821": { modb_f: 0.981698, modb_s: 1.031270, modc_f: 0.906803, modc_s: 1.022128, tplpd_f: 0.790610, tplpd_s: 1.032143, tplbi_f: 1.127716, tplbi_s: 1.163406 },
        "822": { modb_f: 0.966304, modb_s: 1.030226, modc_f: 0.903850, modc_s: 1.051141, tplpd_f: 0.771206, tplpd_s: 1.031674, tplbi_f: 1.066024, tplbi_s: 1.204275 },
        "823": { modb_f: 0.956988, modb_s: 1.025854, modc_f: 0.902055, modc_s: 1.062747, tplpd_f: 0.757171, tplpd_s: 1.032819, tplbi_f: 1.000756, tplbi_s: 1.165673 },
        "824": { modb_f: 0.980026, modb_s: 1.008923, modc_f: 0.930922, modc_s: 1.047386, tplpd_f: 0.769445, tplpd_s: 1.033164, tplbi_f: 1.066024, tplbi_s: 1.173050 },
        "825": { modb_f: 1.009686, modb_s: 1.007184, modc_f: 0.953929, modc_s: 1.014636, tplpd_f: 0.816357, tplpd_s: 1.027590, tplbi_f: 1.066024, tplbi_s: 1.172837 },
        "826": { modb_f: 1.001009, modb_s: 0.996965, modc_f: 0.975090, modc_s: 1.018558, tplpd_f: 0.865595, tplpd_s: 1.038860, tplbi_f: 1.127716, tplbi_s: 1.181690 },
        "827": { modb_f: 0.987987, modb_s: 1.013462, modc_f: 0.950075, modc_s: 1.027144, tplpd_f: 0.858252, tplpd_s: 1.037417, tplbi_f: 1.127716, tplbi_s: 1.157837 },
        "828": { modb_f: 0.967032, modb_s: 1.027352, modc_f: 0.928552, modc_s: 1.024737, tplpd_f: 0.826718, tplpd_s: 1.031513, tplbi_f: 1.127716, tplbi_s: 1.124562 },
        "829": { modb_f: 0.972297, modb_s: 1.042725, modc_f: 0.909998, modc_s: 1.030196, tplpd_f: 0.838436, tplpd_s: 1.034676, tplbi_f: 1.066024, tplbi_s: 1.098095 },
        "830": { modb_f: 1.042294, modb_s: 0.996861, modc_f: 1.017749, modc_s: 1.048063, tplpd_f: 0.870561, tplpd_s: 1.052491, tplbi_f: 1.127716, tplbi_s: 1.153560 },
        "831": { modb_f: 1.035392, modb_s: 0.985789, modc_f: 1.006844, modc_s: 1.025498, tplpd_f: 0.829570, tplpd_s: 1.033301, tplbi_f: 1.127716, tplbi_s: 1.199524 },
        "832": { modb_f: 1.037860, modb_s: 0.986844, modc_f: 0.949000, modc_s: 1.023174, tplpd_f: 0.751782, tplpd_s: 1.043253, tplbi_f: 0.909557, tplbi_s: 1.171859 },
        "833": { modb_f: 1.050345, modb_s: 1.005323, modc_f: 1.015121, modc_s: 1.037464, tplpd_f: 0.875437, tplpd_s: 1.038961, tplbi_f: 1.127716, tplbi_s: 1.184347 },
        "840": { modb_f: 1.029926, modb_s: 1.004809, modc_f: 0.970131, modc_s: 1.052820, tplpd_f: 0.807674, tplpd_s: 1.042947, tplbi_f: 1.000756, tplbi_s: 1.165745 },
        "842": { modb_f: 0.948367, modb_s: 1.013843, modc_f: 0.906631, modc_s: 1.074262, tplpd_f: 0.742425, tplpd_s: 1.030373, tplbi_f: 1.000756, tplbi_s: 1.152501 },
        "843": { modb_f: 0.939158, modb_s: 1.018947, modc_f: 0.894758, modc_s: 1.083399, tplpd_f: 0.725705, tplpd_s: 1.048256, tplbi_f: 0.909557, tplbi_s: 1.155300 },
        "844": { modb_f: 0.923851, modb_s: 1.038696, modc_f: 0.883701, modc_s: 1.075597, tplpd_f: 0.732397, tplpd_s: 1.055493, tplbi_f: 0.909557, tplbi_s: 1.161773 },
        "845": { modb_f: 0.937365, modb_s: 1.031795, modc_f: 0.893334, modc_s: 1.075174, tplpd_f: 0.741442, tplpd_s: 1.041251, tplbi_f: 1.000756, tplbi_s: 1.161274 },
        "846": { modb_f: 0.918065, modb_s: 1.047044, modc_f: 0.881879, modc_s: 1.081760, tplpd_f: 0.737718, tplpd_s: 1.053888, tplbi_f: 1.000756, tplbi_s: 1.182274 },
        "847": { modb_f: 0.905713, modb_s: 1.067958, modc_f: 0.871994, modc_s: 1.083253, tplpd_f: 0.755258, tplpd_s: 1.053307, tplbi_f: 1.000756, tplbi_s: 1.156259 },
        "848": { modb_f: 0.864421, modb_s: 1.081741, modc_f: 0.833765, modc_s: 1.080264, tplpd_f: 0.719856, tplpd_s: 1.042642, tplbi_f: 0.909557, tplbi_s: 1.091974 },
        "849": { modb_f: 0.891096, modb_s: 1.089081, modc_f: 0.859689, modc_s: 1.085607, tplpd_f: 0.762459, tplpd_s: 1.046366, tplbi_f: 1.000756, tplbi_s: 1.117119 },
        "851": { modb_f: 0.938275, modb_s: 1.022764, modc_f: 0.891090, modc_s: 1.070297, tplpd_f: 0.726223, tplpd_s: 1.049745, tplbi_f: 0.909557, tplbi_s: 1.147227 },
        "852": { modb_f: 0.959744, modb_s: 1.038505, modc_f: 0.916405, modc_s: 1.035187, tplpd_f: 0.859837, tplpd_s: 1.042742, tplbi_f: 1.204364, tplbi_s: 1.079581 },
        "880": { modb_f: 0.750337, modb_s: 1.123993, modc_f: 0.789466, modc_s: 1.080344, tplpd_f: 0.587566, tplpd_s: 1.061416, tplbi_f: 0.776357, tplbi_s: 1.236344 },
        "881": { modb_f: 0.760329, modb_s: 1.122808, modc_f: 0.792811, modc_s: 1.083778, tplpd_f: 0.601357, tplpd_s: 1.055490, tplbi_f: 0.776357, tplbi_s: 1.232717 },
        "882": { modb_f: 0.748819, modb_s: 1.122372, modc_f: 0.787354, modc_s: 1.086365, tplpd_f: 0.583445, tplpd_s: 1.058547, tplbi_f: 0.776357, tplbi_s: 1.236343 },
        "883": { modb_f: 0.750432, modb_s: 1.120753, modc_f: 0.785754, modc_s: 1.086365, tplpd_f: 0.582392, tplpd_s: 1.056869, tplbi_f: 0.776357, tplbi_s: 1.236343 },
        "884": { modb_f: 0.770273, modb_s: 1.120413, modc_f: 0.795163, modc_s: 1.083054, tplpd_f: 0.613090, tplpd_s: 1.052831, tplbi_f: 0.776357, tplbi_s: 1.224657 },
        "885": { modb_f: 0.777507, modb_s: 1.124021, modc_f: 0.802825, modc_s: 1.085417, tplpd_f: 0.633369, tplpd_s: 1.053667, tplbi_f: 0.776357, tplbi_s: 1.224154 },
        "890": { modb_f: 0.974356, modb_s: 0.991799, modc_f: 0.926729, modc_s: 1.063488, tplpd_f: 0.821593, tplpd_s: 0.932889, tplbi_f: 0.776357, tplbi_s: 1.054633 },
        "891": { modb_f: 0.978372, modb_s: 0.987434, modc_f: 0.915242, modc_s: 1.069445, tplpd_f: 0.799857, tplpd_s: 0.926655, tplbi_f: 0.776357, tplbi_s: 1.069764 },
        "892": { modb_f: 0.974937, modb_s: 0.989289, modc_f: 0.917348, modc_s: 1.061339, tplpd_f: 0.805687, tplpd_s: 0.925482, tplbi_f: 0.776357, tplbi_s: 1.064865 },
        "893": { modb_f: 0.982128, modb_s: 0.989708, modc_f: 0.906782, modc_s: 1.061731, tplpd_f: 0.786314, tplpd_s: 0.923564, tplbi_f: 0.776357, tplbi_s: 1.066945 },
        "894": { modb_f: 0.972824, modb_s: 0.992094, modc_f: 0.921576, modc_s: 1.060045, tplpd_f: 0.804436, tplpd_s: 0.926198, tplbi_f: 0.776357, tplbi_s: 1.056073 },
        "896": { modb_f: 0.977041, modb_s: 1.006317, modc_f: 0.929644, modc_s: 1.051590, tplpd_f: 0.864078, tplpd_s: 0.946994, tplbi_f: 0.824984, tplbi_s: 1.000488 },
        "900": { modb_f: 1.008881, modb_s: 0.992707, modc_f: 0.951970, modc_s: 1.033107, tplpd_f: 0.777973, tplpd_s: 1.030453, tplbi_f: 1.127716, tplbi_s: 1.128323 },
        "901": { modb_f: 0.953632, modb_s: 1.012146, modc_f: 0.899780, modc_s: 1.070545, tplpd_f: 0.727279, tplpd_s: 1.048976, tplbi_f: 1.000756, tplbi_s: 1.135455 },
        "902": { modb_f: 0.931306, modb_s: 1.015401, modc_f: 0.886132, modc_s: 1.053686, tplpd_f: 0.724738, tplpd_s: 1.047446, tplbi_f: 1.000756, tplbi_s: 1.136612 },
        "903": { modb_f: 0.973671, modb_s: 1.007195, modc_f: 0.907399, modc_s: 1.050529, tplpd_f: 0.730464, tplpd_s: 1.050910, tplbi_f: 1.000756, tplbi_s: 1.133019 },
        "904": { modb_f: 0.987737, modb_s: 1.004870, modc_f: 0.933729, modc_s: 1.054393, tplpd_f: 0.757077, tplpd_s: 1.042790, tplbi_f: 1.066024, tplbi_s: 1.119985 },
        "905": { modb_f: 0.974478, modb_s: 1.008058, modc_f: 0.904755, modc_s: 1.072988, tplpd_f: 0.734674, tplpd_s: 1.043077, tplbi_f: 1.000756, tplbi_s: 1.129777 },
        "906": { modb_f: 0.967748, modb_s: 1.010192, modc_f: 0.902405, modc_s: 1.068552, tplpd_f: 0.733846, tplpd_s: 1.049600, tplbi_f: 1.000756, tplbi_s: 1.130906 },
        "907": { modb_f: 0.982163, modb_s: 1.001386, modc_f: 0.917006, modc_s: 1.056151, tplpd_f: 0.739711, tplpd_s: 1.048300, tplbi_f: 1.000756, tplbi_s: 1.130219 },
        "908": { modb_f: 0.995747, modb_s: 0.999803, modc_f: 0.943922, modc_s: 1.047031, tplpd_f: 0.749982, tplpd_s: 1.038502, tplbi_f: 1.066024, tplbi_s: 1.127779 },
        "909": { modb_f: 1.016337, modb_s: 0.992126, modc_f: 0.953255, modc_s: 1.046001, tplpd_f: 0.758123, tplpd_s: 1.035941, tplbi_f: 1.066024, tplbi_s: 1.147146 },
        "911": { modb_f: 1.027405, modb_s: 0.991831, modc_f: 0.946870, modc_s: 1.039982, tplpd_f: 0.743473, tplpd_s: 1.041552, tplbi_f: 1.066024, tplbi_s: 1.188859 },
        "912": { modb_f: 1.008932, modb_s: 0.996009, modc_f: 0.945553, modc_s: 1.040788, tplpd_f: 0.741440, tplpd_s: 1.048422, tplbi_f: 1.066024, tplbi_s: 1.152101 },
        "913": { modb_f: 1.025132, modb_s: 0.991097, modc_f: 0.969352, modc_s: 1.036217, tplpd_f: 0.769525, tplpd_s: 1.029041, tplbi_f: 1.127716, tplbi_s: 1.188835 },
        "920": { modb_f: 1.029750, modb_s: 0.997157, modc_f: 0.936786, modc_s: 1.028335, tplpd_f: 0.728831, tplpd_s: 1.053288, tplbi_f: 1.066024, tplbi_s: 1.125750 },
        "921": { modb_f: 0.991572, modb_s: 1.003930, modc_f: 0.913121, modc_s: 1.041322, tplpd_f: 0.727265, tplpd_s: 1.046514, tplbi_f: 1.000756, tplbi_s: 1.129975 },
        "922": { modb_f: 1.002974, modb_s: 1.009964, modc_f: 0.897625, modc_s: 1.036383, tplpd_f: 0.701469, tplpd_s: 1.043699, tplbi_f: 0.909557, tplbi_s: 1.121487 },
        "923": { modb_f: 1.018542, modb_s: 0.996290, modc_f: 0.920995, modc_s: 1.036900, tplpd_f: 0.720811, tplpd_s: 1.047762, tplbi_f: 1.000756, tplbi_s: 1.136235 },
        "924": { modb_f: 1.033702, modb_s: 0.990117, modc_f: 0.945281, modc_s: 1.033964, tplpd_f: 0.743481, tplpd_s: 1.042125, tplbi_f: 1.000756, tplbi_s: 1.184145 },
        "925": { modb_f: 1.020795, modb_s: 1.003800, modc_f: 0.911184, modc_s: 1.033559, tplpd_f: 0.713786, tplpd_s: 1.045921, tplbi_f: 1.000756, tplbi_s: 1.136450 },
        "926": { modb_f: 1.037617, modb_s: 0.998303, modc_f: 0.922648, modc_s: 1.040386, tplpd_f: 0.731674, tplpd_s: 1.044654, tplbi_f: 0.909557, tplbi_s: 1.169497 },
        "927": { modb_f: 1.035624, modb_s: 1.003126, modc_f: 0.927865, modc_s: 1.040248, tplpd_f: 0.716790, tplpd_s: 1.049651, tplbi_f: 0.909557, tplbi_s: 1.149556 },
        "928": { modb_f: 1.034133, modb_s: 0.987177, modc_f: 0.928174, modc_s: 1.041078, tplpd_f: 0.739557, tplpd_s: 1.042909, tplbi_f: 0.909557, tplbi_s: 1.159399 },
        "929": { modb_f: 1.030387, modb_s: 0.996182, modc_f: 0.930069, modc_s: 1.028818, tplpd_f: 0.727943, tplpd_s: 1.044015, tplbi_f: 0.909557, tplbi_s: 1.156763 },
        "931": { modb_f: 1.023433, modb_s: 1.004904, modc_f: 0.907408, modc_s: 1.034784, tplpd_f: 0.702549, tplpd_s: 1.041616, tplbi_f: 0.909557, tplbi_s: 1.139726 },
        "932": { modb_f: 1.030867, modb_s: 0.983075, modc_f: 0.967348, modc_s: 1.038720, tplpd_f: 0.779955, tplpd_s: 1.040653, tplbi_f: 1.066024, tplbi_s: 1.182800 },
        "940": { modb_f: 1.024132, modb_s: 1.020940, modc_f: 0.884591, modc_s: 1.033750, tplpd_f: 0.685871, tplpd_s: 1.042541, tplbi_f: 0.909557, tplbi_s: 1.106995 },
        "941": { modb_f: 1.002294, modb_s: 1.041955, modc_f: 0.867868, modc_s: 1.036173, tplpd_f: 0.652641, tplpd_s: 1.016131, tplbi_f: 0.824984, tplbi_s: 1.119434 },
        "942": { modb_f: 1.010958, modb_s: 1.019384, modc_f: 0.888556, modc_s: 1.033784, tplpd_f: 0.685714, tplpd_s: 1.036096, tplbi_f: 0.909557, tplbi_s: 1.111819 },
        "943": { modb_f: 1.010915, modb_s: 1.027773, modc_f: 0.877393, modc_s: 1.032540, tplpd_f: 0.669923, tplpd_s: 1.029081, tplbi_f: 0.909557, tplbi_s: 1.110637 },
        "944": { modb_f: 0.998213, modb_s: 1.055879, modc_f: 0.861212, modc_s: 1.038821, tplpd_f: 0.655090, tplpd_s: 1.004685, tplbi_f: 0.824984, tplbi_s: 1.132585 },
        "945": { modb_f: 1.003770, modb_s: 1.042273, modc_f: 0.867233, modc_s: 1.035336, tplpd_f: 0.657359, tplpd_s: 1.012790, tplbi_f: 0.824984, tplbi_s: 1.126465 },
        "946": { modb_f: 0.984784, modb_s: 1.051506, modc_f: 0.863899, modc_s: 1.051412, tplpd_f: 0.653185, tplpd_s: 0.997021, tplbi_f: 0.776357, tplbi_s: 1.138208 },
        "947": { modb_f: 0.998245, modb_s: 1.047504, modc_f: 0.859639, modc_s: 1.041833, tplpd_f: 0.653108, tplpd_s: 1.003615, tplbi_f: 0.824984, tplbi_s: 1.146315 },
        "950": { modb_f: 0.785385, modb_s: 1.024597, modc_f: 0.788508, modc_s: 0.998006, tplpd_f: 0.689868, tplpd_s: 1.025157, tplbi_f: 0.909557, tplbi_s: 1.113610 },
        "951": { modb_f: 0.778018, modb_s: 1.024457, modc_f: 0.780693, modc_s: 0.998006, tplpd_f: 0.704853, tplpd_s: 1.020790, tplbi_f: 0.909557, tplbi_s: 1.106664 },
        "952": { modb_f: 0.774776, modb_s: 1.025917, modc_f: 0.777896, modc_s: 0.998006, tplpd_f: 0.713263, tplpd_s: 1.021005, tplbi_f: 0.909557, tplbi_s: 1.106664 },
        "953": { modb_f: 0.813916, modb_s: 1.035470, modc_f: 0.815128, modc_s: 1.033668, tplpd_f: 0.672451, tplpd_s: 1.031884, tplbi_f: 0.909557, tplbi_s: 1.122090 },
        "954": { modb_f: 0.843290, modb_s: 1.024452, modc_f: 0.829389, modc_s: 1.037172, tplpd_f: 0.689888, tplpd_s: 1.039995, tplbi_f: 1.066024, tplbi_s: 1.130724 },
        "955": { modb_f: 0.813070, modb_s: 1.062535, modc_f: 0.808353, modc_s: 1.072242, tplpd_f: 0.664844, tplpd_s: 1.025782, tplbi_f: 0.824984, tplbi_s: 1.119451 },
        "956": { modb_f: 0.818230, modb_s: 1.074592, modc_f: 0.806462, modc_s: 1.072180, tplpd_f: 0.681102, tplpd_s: 1.023587, tplbi_f: 0.776357, tplbi_s: 1.083340 },
        "957": { modb_f: 0.832938, modb_s: 1.078857, modc_f: 0.814341, modc_s: 1.074947, tplpd_f: 0.692746, tplpd_s: 1.027287, tplbi_f: 0.776357, tplbi_s: 1.074230 },
        "958": { modb_f: 0.818227, modb_s: 1.085886, modc_f: 0.805227, modc_s: 1.066121, tplpd_f: 0.685836, tplpd_s: 1.011082, tplbi_f: 0.776357, tplbi_s: 1.066111 },
        "959": { modb_f: 0.819192, modb_s: 1.083654, modc_f: 0.805026, modc_s: 1.068047, tplpd_f: 0.679729, tplpd_s: 1.017053, tplbi_f: 0.776357, tplbi_s: 1.085050 },
        "961": { modb_f: 0.810755, modb_s: 1.093150, modc_f: 0.802793, modc_s: 1.061730, tplpd_f: 0.682093, tplpd_s: 1.007649, tplbi_f: 0.776357, tplbi_s: 1.086986 },
        "962": { modb_f: 0.791861, modb_s: 1.086840, modc_f: 0.790613, modc_s: 1.058678, tplpd_f: 0.741412, tplpd_s: 0.968186, tplbi_f: 0.776357, tplbi_s: 0.916328 },
        "963": { modb_f: 0.885760, modb_s: 1.016336, modc_f: 0.855258, modc_s: 1.034320, tplpd_f: 0.713617, tplpd_s: 1.057122, tplbi_f: 1.000756, tplbi_s: 1.146430 },
        "964": { modb_f: 0.954415, modb_s: 1.009962, modc_f: 0.893890, modc_s: 1.045892, tplpd_f: 0.717894, tplpd_s: 1.048769, tplbi_f: 1.000756, tplbi_s: 1.132584 },
        "965": { modb_f: 1.014363, modb_s: 1.024037, modc_f: 0.876374, modc_s: 1.029669, tplpd_f: 0.674012, tplpd_s: 1.032405, tplbi_f: 0.824984, tplbi_s: 1.108776 },
        "966": { modb_f: 1.008901, modb_s: 1.020915, modc_f: 0.885131, modc_s: 1.033093, tplpd_f: 0.681286, tplpd_s: 1.034530, tplbi_f: 0.909557, tplbi_s: 1.114550 },
        "970": { modb_f: 0.807327, modb_s: 1.032807, modc_f: 0.925258, modc_s: 0.948959, tplpd_f: 1.040075, tplpd_s: 0.801400, tplbi_f: 1.000756, tplbi_s: 0.792308 },
        "971": { modb_f: 0.790965, modb_s: 1.045504, modc_f: 0.936407, modc_s: 0.925309, tplpd_f: 1.105612, tplpd_s: 0.800831, tplbi_f: 1.127716, tplbi_s: 0.767144 },
        "972": { modb_f: 0.788620, modb_s: 1.052150, modc_f: 0.937741, modc_s: 0.935549, tplpd_f: 1.079239, tplpd_s: 0.791541, tplbi_f: 1.127716, tplbi_s: 0.751097 },
        "973": { modb_f: 0.788056, modb_s: 1.041303, modc_f: 0.925429, modc_s: 0.956165, tplpd_f: 1.071478, tplpd_s: 0.790671, tplbi_f: 1.066024, tplbi_s: 0.774525 },
        "974": { modb_f: 0.794104, modb_s: 1.047188, modc_f: 0.906696, modc_s: 0.989487, tplpd_f: 0.993914, tplpd_s: 0.827035, tplbi_f: 0.909557, tplbi_s: 0.818127 },
        "975": { modb_f: 0.776262, modb_s: 1.061064, modc_f: 0.855429, modc_s: 1.052440, tplpd_f: 0.900065, tplpd_s: 0.890684, tplbi_f: 0.824984, tplbi_s: 0.834910 },
        "976": { modb_f: 0.774637, modb_s: 1.068623, modc_f: 0.833819, modc_s: 1.081900, tplpd_f: 0.877291, tplpd_s: 0.916736, tplbi_f: 0.824984, tplbi_s: 0.844787 },
        "977": { modb_f: 0.778578, modb_s: 1.069128, modc_f: 0.830190, modc_s: 1.066129, tplpd_f: 0.863479, tplpd_s: 0.918195, tplbi_f: 0.824984, tplbi_s: 0.851586 },
        "978": { modb_f: 0.786004, modb_s: 1.080220, modc_f: 0.804864, modc_s: 1.070054, tplpd_f: 0.800034, tplpd_s: 0.948845, tplbi_f: 0.776357, tplbi_s: 0.880426 },
        "979": { modb_f: 0.771021, modb_s: 1.064837, modc_f: 0.843996, modc_s: 1.067884, tplpd_f: 0.874539, tplpd_s: 0.901178, tplbi_f: 0.824984, tplbi_s: 0.835537 },
        "981": { modb_f: 0.789383, modb_s: 1.093300, modc_f: 0.773635, modc_s: 1.050580, tplpd_f: 0.726009, tplpd_s: 0.972122, tplbi_f: 0.776357, tplbi_s: 0.902021 },
        "982": { modb_f: 0.790611, modb_s: 1.095389, modc_f: 0.764187, modc_s: 1.049010, tplpd_f: 0.713668, tplpd_s: 0.971176, tplbi_f: 0.776357, tplbi_s: 0.892018 },
        "983": { modb_f: 0.800042, modb_s: 1.088356, modc_f: 0.792109, modc_s: 1.059956, tplpd_f: 0.699191, tplpd_s: 0.988734, tplbi_f: 0.776357, tplbi_s: 0.987691 }
    },
    make_desc: {
        "缺失值": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.901301, tplpd_s: 1.031065, tplbi_f: 0.883628 },
        "ABARTH(義大利)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "AMG(改裝車)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.903151, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Alfa Romeo愛快羅密歐(義大利)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Alpina(德國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Alpine(法國)": { modb_f: 0.901058, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Amc Jeep美國吉普(美國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 1.067940, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Aro(羅馬尼亞)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Asia亞細亞(韓國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Aston Martin奧頓馬丁(英國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.839077, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Audi奧迪(德國)": { modb_f: 0.999266, modc_f: 0.987313, tplpd_f: 0.937225, tplpd_s: 1.024290, tplbi_f: 0.900843 },
        "BMW(德國)": { modb_f: 1.046991, modc_f: 0.882396, tplpd_f: 0.895219, tplpd_s: 1.072994, tplbi_f: 0.878709 },
        "BRABUS(德國)": { modb_f: 0.901058, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Bentley(英國)": { modb_f: 0.876772, modc_f: 0.882396, tplpd_f: 0.570126, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Benz賓士": { modb_f: 0.946483, modc_f: 0.844681, tplpd_f: 0.876343, tplpd_s: 1.044281, tplbi_f: 0.886019 },
        "Bertone博通(義大利)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Buick別克": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 0.983080, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "CMC(美國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Cadillac卡地拉克(美國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Carbodies(英國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Chevrolet雪佛蘭(美國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Chrysler克萊斯勒": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 1.154185, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Citroen雪鐵龍(法國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Daewoo大宇(韓國)": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Daihatsu大發(日本)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Dodge道奇(美國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Ferrari法拉利(義大利)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.477890, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Fiat飛雅特(義大利)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 1.076388, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Ford福特": { modb_f: 0.897590, modc_f: 0.880513, tplpd_f: 0.970750, tplpd_s: 1.037379, tplbi_f: 0.908136 },
        "GMC(美國)": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Honda本田": { modb_f: 0.834588, modc_f: 0.931296, tplpd_f: 0.892135, tplpd_s: 0.999415, tplbi_f: 0.884925 },
        "Hummer(美國)": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 0.996825, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Hyundai現代": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.957313, tplpd_s: 1.018352, tplbi_f: 0.946036 },
        "Isuzu五十鈴": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 1.366280, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Iveco(義大利)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Jaguar積架(英國)": { modb_f: 0.961720, modc_f: 0.882396, tplpd_f: 0.742589, tplpd_s: 1.018352, tplbi_f: 0.877052 },
        "Kia起亞": { modb_f: 0.901058, modc_f: 0.842022, tplpd_f: 0.916550, tplpd_s: 1.018352, tplbi_f: 0.910369 },
        "Lada(蘇聯)": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Lamborghini林寶堅尼(義大利)": { modb_f: 0.901058, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Lancia蘭吉雅(義大利)": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Land Rover路華(英國)": { modb_f: 0.906084, modc_f: 0.825909, tplpd_f: 0.965933, tplpd_s: 1.038395, tplbi_f: 0.884737 },
        "Lincoln林肯(美國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Lotus蓮花(英國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "MG Motor": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 1.215871, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "MORGAN(英國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Mahindra馬亨達(印度)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Maserati馬沙拉蒂(義大利)": { modb_f: 0.898268, modc_f: 0.882396, tplpd_f: 0.838306, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Maybach(德)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Mazda馬自達": { modb_f: 1.007397, modc_f: 0.968328, tplpd_f: 0.958577, tplpd_s: 1.030502, tplbi_f: 0.858517 },
        "Mclaren(英國)": { modb_f: 0.901058, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Mercury謀克利(美國)": { modb_f: 0.901058, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Mini(英國)": { modb_f: 0.840061, modc_f: 0.660542, tplpd_f: 0.846814, tplpd_s: 1.018352, tplbi_f: 0.879330 },
        "Mitsubishi三菱": { modb_f: 0.901058, modc_f: 0.894129, tplpd_f: 1.061327, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Nissan日產": { modb_f: 0.992549, modc_f: 0.845515, tplpd_f: 0.970971, tplpd_s: 1.007618, tplbi_f: 0.857203 },
        "Nummi(美國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Oldsmobile奧斯莫比(美國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Opel歐寶(德國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.778013, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Opel歐普(西班牙)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Peugeot寶獅(法國)": { modb_f: 0.744714, modc_f: 0.900881, tplpd_f: 0.850016, tplpd_s: 1.018352, tplbi_f: 0.895468 },
        "Plymouth順風(美國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Pontiac旁的克(美國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Porsche保時捷(德國)": { modb_f: 0.870338, modc_f: 0.854734, tplpd_f: 0.824954, tplpd_s: 1.112517, tplbi_f: 0.839904 },
        "Porton寶騰蓮花(馬來西亞)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 1.014906, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "RUF(德國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Renault雷諾": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.821988, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Rolls Royce勞斯萊斯(英國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.834645, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "SAAB紳寶(瑞典)": { modb_f: 1.635920, modc_f: 0.882396, tplpd_f: 0.881399, tplpd_s: 1.018352, tplbi_f: 0.937334 },
        "SCION(美國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Santana(西班牙)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Saturn(美國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Seat喜悅(西班牙)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Skoda(捷克)": { modb_f: 0.850272, modc_f: 0.897294, tplpd_f: 0.925303, tplpd_s: 1.018352, tplbi_f: 0.913067 },
        "SsangYong雙龍(韓國)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905332, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "Subaru速霸陸": { modb_f: 0.832195, modc_f: 0.844427, tplpd_f: 0.810351, tplpd_s: 0.964457, tplbi_f: 0.709105 },
        "Suzuki鈴木": { modb_f: 0.830338, modc_f: 0.824465, tplpd_f: 0.872862, tplpd_s: 1.005137, tplbi_f: 0.859949 },
        "TESLA(美國)": { modb_f: 1.267521, modc_f: 0.882396, tplpd_f: 1.524500, tplpd_s: 1.018352, tplbi_f: 1.334136 },
        "Toyota豐田": { modb_f: 1.000000, modc_f: 0.937539, tplpd_f: 0.966884, tplpd_s: 1.018309, tplbi_f: 0.884737 },
        "VW福斯": { modb_f: 0.831975, modc_f: 0.906703, tplpd_f: 0.904485, tplpd_s: 1.013077, tplbi_f: 0.884737 },
        "Volvo富豪(瑞典)": { modb_f: 1.006404, modc_f: 0.882396, tplpd_f: 0.877030, tplpd_s: 0.952626, tplbi_f: 0.875533 },
        "Winnebago維納賓哥(美國)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "三富(國產)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "三陽(國產)": { modb_f: 0.945043, modc_f: 0.921661, tplpd_f: 0.983448, tplpd_s: 1.044066, tplbi_f: 0.927242 },
        "中華(國產)": { modb_f: 0.677363, modc_f: 0.870351, tplpd_f: 0.954423, tplpd_s: 1.018352, tplbi_f: 0.919635 },
        "先進(國產)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "其他(國產)": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "勝榮(國產)": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 0.796299, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "台朔(國產)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.552884, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "國瑞(國產)": { modb_f: 0.991058, modc_f: 1.000000, tplpd_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 },
        "大慶(國產)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.865663, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "太子(國產)": { modb_f: 0.901058, modc_f: 0.861077, tplpd_f: 0.885568, tplpd_s: 1.018352, tplbi_f: 0.854524 },
        "歐普(國產)": { modb_f: 1.000000, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "納智捷(Luxgen)(國產)": { modb_f: 0.844333, modc_f: 0.926106, tplpd_f: 1.009495, tplpd_s: 1.041605, tplbi_f: 0.843856 },
        "羽田(國產)": { modb_f: 0.901058, modc_f: 1.000000, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 },
        "裕隆(國產)": { modb_f: 0.817493, modc_f: 0.876211, tplpd_f: 0.928717, tplpd_s: 0.997315, tplbi_f: 0.919387 },
        "酷比(Tobe)(國產)": { modb_f: 0.901058, modc_f: 0.882396, tplpd_f: 0.905208, tplpd_s: 1.018352, tplbi_f: 0.884737 }
    },
    motor_type: {
        "公司自小貨": { modc_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 },
        "客貨兩用車_BiUse": { modc_f: 0.857974, tplpd_s: 1.033690, tplbi_f: 0.880236 },
        "自用小型特種車": { modc_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 },
        "自用小客車_PPA": { modc_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 },
        "自用小貨車": { modc_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 }
    },
    veh_age: function(val) {
        if (val <= -1.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 0.738982, tplpd_s: 0.923454, tplbi_f: 0.856000 };
        if (val <= 0.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 1.000000, modc_s: 0.997400, tplpd_f: 0.738982, tplpd_s: 0.923454, tplbi_f: 0.856000 };
        if (val <= 1.0) return { modb_f: 1.000000, modb_s: 1.062873, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 0.771827, tplpd_s: 0.924152, tplbi_f: 0.856000 };
        if (val <= 2.0) return { modb_f: 1.000000, modb_s: 1.104113, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 0.797783, tplpd_s: 0.960242, tplbi_f: 0.861507 };
        if (val <= 3.0) return { modb_f: 1.000000, modb_s: 1.187619, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 0.932607, tplpd_s: 0.981088, tplbi_f: 0.996510 };
        if (val <= 4.0) return { modb_f: 1.000000, modb_s: 1.189256, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 0.993203, tplpd_s: 1.000000, tplbi_f: 1.000000 };
        if (val <= 5.0) return { modb_f: 1.000000, modb_s: 1.189256, modc_f: 1.000000, modc_s: 0.991630, tplpd_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 };
        if (val <= 6.0) return { modb_f: 0.998314, modb_s: 1.194042, modc_f: 1.000000, modc_s: 0.972567, tplpd_f: 1.021876, tplpd_s: 1.000000, tplbi_f: 1.010852 };
        if (val <= 7.0) return { modb_f: 0.983024, modb_s: 1.194042, modc_f: 0.992006, modc_s: 0.949909, tplpd_f: 1.041057, tplpd_s: 0.999756, tplbi_f: 1.030101 };
        if (val <= 8.0) return { modb_f: 0.974131, modb_s: 1.134434, modc_f: 0.961029, modc_s: 0.910748, tplpd_f: 1.040053, tplpd_s: 0.999756, tplbi_f: 1.030101 };
        if (val <= 9.0) return { modb_f: 0.974131, modb_s: 1.128295, modc_f: 0.961029, modc_s: 0.874892, tplpd_f: 1.055297, tplpd_s: 0.966872, tplbi_f: 1.018744 };
        if (val <= 10.0) return { modb_f: 0.901154, modb_s: 1.111232, modc_f: 0.938661, modc_s: 0.818138, tplpd_f: 1.055297, tplpd_s: 0.967160, tplbi_f: 0.974952 };
        if (val <= 11.0) return { modb_f: 0.901154, modb_s: 1.106911, modc_f: 0.925061, modc_s: 0.783249, tplpd_f: 1.019013, tplpd_s: 0.972824, tplbi_f: 0.974952 };
        if (val <= 12.0) return { modb_f: 0.851381, modb_s: 1.095953, modc_f: 0.909811, modc_s: 0.765737, tplpd_f: 1.011032, tplpd_s: 0.972824, tplbi_f: 0.967780 };
        if (val <= 13.0) return { modb_f: 0.851381, modb_s: 1.060936, modc_f: 0.877841, modc_s: 0.722274, tplpd_f: 0.994400, tplpd_s: 0.972824, tplbi_f: 0.927994 };
        if (val <= 14.0) return { modb_f: 0.851381, modb_s: 1.060936, modc_f: 0.777441, modc_s: 0.681953, tplpd_f: 0.994400, tplpd_s: 0.958353, tplbi_f: 0.927994 };
        if (val <= 15.0) return { modb_f: 0.851381, modb_s: 1.060936, modc_f: 0.757658, modc_s: 0.572027, tplpd_f: 0.994400, tplpd_s: 0.958353, tplbi_f: 0.888772 };
        if (val <= 16.0) return { modb_f: 0.811758, modb_s: 0.817634, modc_f: 0.735560, modc_s: 0.553321, tplpd_f: 0.953649, tplpd_s: 0.958353, tplbi_f: 0.852015 };
        if (val <= 17.0) return { modb_f: 0.811758, modb_s: 0.817634, modc_f: 0.735560, modc_s: 0.525261, tplpd_f: 0.944617, tplpd_s: 0.961492, tplbi_f: 0.831795 };
        if (val <= 18.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.735560, modc_s: 0.478495, tplpd_f: 0.919267, tplpd_s: 0.961492, tplbi_f: 0.803373 };
        if (val <= 19.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.909832, tplpd_s: 0.961492, tplbi_f: 0.803373 };
        if (val <= 20.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.857713, tplpd_s: 0.961492, tplbi_f: 0.788611 };
        if (val <= 21.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.857713, tplpd_s: 0.961492, tplbi_f: 0.765519 };
        if (val <= 22.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.857713, tplpd_s: 0.961492, tplbi_f: 0.765519 };
        if (val <= 23.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.796835, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 24.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.788213, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 25.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.765898, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 26.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.765898, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 27.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.757191, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 28.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.757191, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 29.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 30.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 31.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 32.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 33.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 34.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 35.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 36.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 37.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 38.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 39.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 40.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 41.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 42.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 43.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 44.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 45.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 46.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 47.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 48.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 49.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 50.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 51.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 52.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 53.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 54.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 55.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 56.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 64.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 65.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 92.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 94.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 108.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 109.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 110.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        if (val <= 111.0) return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
        return { modb_f: 0.762230, modb_s: 0.817634, modc_f: 0.648503, modc_s: 0.478495, tplpd_f: 0.738992, tplpd_s: 0.961492, tplbi_f: 0.699110 };
    },
    displacement: function(val) {
        if (val <= 1.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 124.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 149.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 199.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 240.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 300.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 400.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 497.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 599.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 647.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 698.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 796.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 875.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 898.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 970.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 993.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 999.0) return { tplpd_s: 0.958278, tplbi_s: 0.883731 };
        if (val <= 1061.0) return { tplpd_s: 0.958278, tplbi_s: 0.888401 };
        if (val <= 1086.0) return { tplpd_s: 0.958278, tplbi_s: 0.888401 };
        if (val <= 1100.0) return { tplpd_s: 0.958278, tplbi_s: 0.888401 };
        if (val <= 1149.0) return { tplpd_s: 0.958278, tplbi_s: 0.888401 };
        if (val <= 1171.0) return { tplpd_s: 0.976748, tplbi_s: 0.888401 };
        if (val <= 1197.0) return { tplpd_s: 0.976748, tplbi_s: 0.888401 };
        if (val <= 1200.0) return { tplpd_s: 0.976748, tplbi_s: 0.888401 };
        if (val <= 1242.0) return { tplpd_s: 0.976748, tplbi_s: 0.937872 };
        if (val <= 1248.0) return { tplpd_s: 0.976748, tplbi_s: 0.937872 };
        if (val <= 1275.0) return { tplpd_s: 0.976748, tplbi_s: 0.937872 };
        if (val <= 1300.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1328.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1332.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1341.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1360.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1373.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1390.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1395.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1400.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1462.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1477.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1490.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1497.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1498.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1500.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1556.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1584.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1587.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1591.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1595.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1598.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1600.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1618.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1668.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1685.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1700.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1747.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1762.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1769.0) return { tplpd_s: 0.976748, tplbi_s: 0.956452 };
        if (val <= 1781.0) return { tplpd_s: 0.976748, tplbi_s: 1.000000 };
        if (val <= 1794.0) return { tplpd_s: 0.976748, tplbi_s: 1.000000 };
        if (val <= 1796.0) return { tplpd_s: 0.976748, tplbi_s: 1.000000 };
        if (val <= 1798.0) return { tplpd_s: 0.976748, tplbi_s: 1.000000 };
        if (val <= 1800.0) return { tplpd_s: 0.976748, tplbi_s: 1.000000 };
        if (val <= 1820.0) return { tplpd_s: 0.976748, tplbi_s: 1.000000 };
        if (val <= 1834.0) return { tplpd_s: 0.976748, tplbi_s: 1.000000 };
        if (val <= 1840.0) return { tplpd_s: 0.976748, tplbi_s: 1.021125 };
        if (val <= 1870.0) return { tplpd_s: 0.976748, tplbi_s: 1.021125 };
        if (val <= 1896.0) return { tplpd_s: 0.976748, tplbi_s: 1.024418 };
        if (val <= 1910.0) return { tplpd_s: 1.000000, tplbi_s: 1.024418 };
        if (val <= 1950.0) return { tplpd_s: 1.000000, tplbi_s: 1.024418 };
        if (val <= 1969.0) return { tplpd_s: 1.000000, tplbi_s: 1.024418 };
        if (val <= 1972.0) return { tplpd_s: 1.000000, tplbi_s: 1.024418 };
        if (val <= 1984.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 1987.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 1991.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 1995.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 1997.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 1998.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 1999.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2000.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2035.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2100.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2109.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2143.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2148.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2164.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2171.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2179.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2191.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2198.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2230.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2261.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2269.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2290.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2300.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2316.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2350.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2354.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2359.0) return { tplpd_s: 1.000000, tplbi_s: 1.050386 };
        if (val <= 2362.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2378.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2397.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2400.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2438.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2461.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2476.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2488.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2494.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2497.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2500.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2521.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2597.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2616.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2656.0) return { tplpd_s: 1.033157, tplbi_s: 1.070524 };
        if (val <= 2672.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2694.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2700.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2736.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2755.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2773.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2793.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2800.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2849.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2894.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2925.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2962.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2967.0) return { tplpd_s: 1.091474, tplbi_s: 1.070524 };
        if (val <= 2979.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 2987.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 2996.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3000.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3059.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3123.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3163.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3189.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3199.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3239.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3246.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3275.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3300.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3311.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3350.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3387.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3400.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3436.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3456.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3471.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3498.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3500.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3564.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3600.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3653.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3696.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3724.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3800.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3828.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3902.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3956.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 3982.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4000.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4134.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4163.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4200.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4266.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4293.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4395.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4511.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4608.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4663.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4700.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4806.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 4966.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5000.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5026.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5204.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5340.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5400.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5439.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5461.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5500.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5663.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5700.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 5950.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 6000.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 6162.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 6208.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 6262.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 6498.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 6592.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 6750.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 7169.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 7545.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 7833.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 9055.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 9980.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 10212.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 10610.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 10802.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 11197.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 11497.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 11798.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 11972.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 12349.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 12750.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 12990.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 13280.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 13456.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 13900.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 14794.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 14970.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 15561.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 15840.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 15980.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 16987.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 17620.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 17690.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 17940.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 17980.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 18340.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 19750.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 19870.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 19980.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 20110.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 20606.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 21275.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 21640.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 21980.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 22354.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 22610.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 22979.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 23510.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 23590.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 23780.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 24000.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 24945.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 25970.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 26560.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 26940.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 27793.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 29670.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 30000.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 31497.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 31990.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 32500.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 33110.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 34565.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 34989.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 37000.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 49017.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 53091.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 54082.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 76061.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 91052.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 93052.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 178100.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 199904.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        if (val <= 200801.0) return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
        return { tplpd_s: 1.093619, tplbi_s: 1.070524 };
    },
    motor_coef: {
        "缺失值": { modb_f: 1.330370, modc_f: 1.281799, tplpd_f: 1.011013, tplbi_f: 1.001211 },
        "-0.6": { modb_f: 1.000000, modc_f: 1.000000, tplpd_f: 0.992180, tplbi_f: 0.963878 },
        "-0.4": { modb_f: 1.365693, modc_f: 1.172675, tplpd_f: 1.061647, tplbi_f: 1.061824 },
        "-0.3": { modb_f: 1.183278, modc_f: 1.183278, tplpd_f: 1.046393, tplbi_f: 1.006240 },
        "-0.2": { modb_f: 1.584227, modc_f: 1.183278, tplpd_f: 1.046393, tplbi_f: 1.006240 },
        "0": { modb_f: 1.824463, modc_f: 1.281799, tplpd_f: 1.000000, tplbi_f: 1.000000 },
        "0.2": { modb_f: 2.342742, modc_f: 1.595061, tplpd_f: 1.359456, tplbi_f: 1.416579 },
        "0.4": { modb_f: 2.622418, modc_f: 1.721866, tplpd_f: 1.541814, tplbi_f: 1.416579 },
        "0.6": { modb_f: 2.935988, modc_f: 2.048570, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "0.8": { modb_f: 3.528003, modc_f: 2.048570, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "1": { modb_f: 3.747514, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "1.2": { modb_f: 3.967025, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "1.4": { modb_f: 4.186536, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "1.6": { modb_f: 4.186536, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "1.8": { modb_f: 4.186536, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "2": { modb_f: 4.186536, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "2.2": { modb_f: 4.186536, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "2.6": { modb_f: 4.186536, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 },
        "4": { modb_f: 4.186536, modc_f: 2.418835, tplpd_f: 1.799516, tplbi_f: 1.416579 }
    },
    passages: {
        "2": { modb_f: 0.704640, modb_s: 1.883632, modc_f: 1.000000, tplpd_f: 0.883484, tplbi_f: 0.927119 },
        "3": { modb_f: 0.908904, modb_s: 1.176997, modc_f: 1.000000, tplpd_f: 0.884724, tplbi_f: 1.000000 },
        "4": { modb_f: 0.908904, modb_s: 1.176997, modc_f: 1.000000, tplpd_f: 0.991597, tplbi_f: 1.000000 },
        "5": { modb_f: 1.000000, modb_s: 1.000000, modc_f: 1.000000, tplpd_f: 1.000000, tplbi_f: 1.000000 },
        "6": { modb_f: 0.981107, modb_s: 0.874694, modc_f: 0.848843, tplpd_f: 1.000000, tplbi_f: 1.000000 },
        "7": { modb_f: 0.981107, modb_s: 0.874694, modc_f: 0.848843, tplpd_f: 0.897517, tplbi_f: 0.863789 },
        "8": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "9": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "10": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "11": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "12": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "13": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "14": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "16": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "17": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "18": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "19": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "20": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "21": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "24": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 },
        "99": { modb_f: 0.914646, modb_s: 0.870831, modc_f: 0.706895, tplpd_f: 0.849288, tplbi_f: 0.863789 }
    },
    rprice: function(val) {
        if (val <= 0.0) return { modc_s: 0.820340, tplbi_f: 1.000000, tplbi_s: 1.000000 };
        if (val <= 1.0) return { modc_s: 0.820340, tplbi_f: 1.000000, tplbi_s: 1.000000 };
        if (val <= 250000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 1.000000 };
        if (val <= 275000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 1.000000 };
        if (val <= 298000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 1.000000 };
        if (val <= 340000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 1.000000 };
        if (val <= 365000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 1.000000 };
        if (val <= 372000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 0.994149 };
        if (val <= 399000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 0.994149 };
        if (val <= 409000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 0.987848 };
        if (val <= 442000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 0.987848 };
        if (val <= 459000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 0.987848 };
        if (val <= 469000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 0.987848 };
        if (val <= 482000.0) return { modc_s: 0.820340, tplbi_f: 1.004079, tplbi_s: 0.987848 };
        if (val <= 499000.0) return { modc_s: 0.820340, tplbi_f: 1.000564, tplbi_s: 0.987848 };
        if (val <= 509000.0) return { modc_s: 0.820340, tplbi_f: 1.000564, tplbi_s: 0.987848 };
        if (val <= 515000.0) return { modc_s: 0.820340, tplbi_f: 1.000564, tplbi_s: 0.987848 };
        if (val <= 519000.0) return { modc_s: 0.821221, tplbi_f: 1.000564, tplbi_s: 0.987848 };
        if (val <= 529000.0) return { modc_s: 0.822102, tplbi_f: 1.033652, tplbi_s: 0.987848 };
        if (val <= 539000.0) return { modc_s: 0.822984, tplbi_f: 1.033652, tplbi_s: 0.987848 };
        if (val <= 549000.0) return { modc_s: 0.822984, tplbi_f: 1.033652, tplbi_s: 0.987848 };
        if (val <= 559000.0) return { modc_s: 0.831706, tplbi_f: 1.033652, tplbi_s: 0.987848 };
        if (val <= 569000.0) return { modc_s: 0.845307, tplbi_f: 1.033652, tplbi_s: 0.987848 };
        if (val <= 579000.0) return { modc_s: 0.867488, tplbi_f: 1.045705, tplbi_s: 0.990489 };
        if (val <= 589000.0) return { modc_s: 0.886706, tplbi_f: 1.045705, tplbi_s: 0.990489 };
        if (val <= 599000.0) return { modc_s: 0.901497, tplbi_f: 1.045705, tplbi_s: 0.990489 };
        if (val <= 609000.0) return { modc_s: 0.907709, tplbi_f: 1.045705, tplbi_s: 0.990489 };
        if (val <= 619000.0) return { modc_s: 0.918697, tplbi_f: 1.045705, tplbi_s: 0.990489 };
        if (val <= 629000.0) return { modc_s: 0.929231, tplbi_f: 1.045705, tplbi_s: 0.990489 };
        if (val <= 639000.0) return { modc_s: 0.939764, tplbi_f: 1.045705, tplbi_s: 0.990489 };
        if (val <= 648000.0) return { modc_s: 0.939764, tplbi_f: 1.045705, tplbi_s: 0.990489 };
        if (val <= 659000.0) return { modc_s: 0.959843, tplbi_f: 1.045705, tplbi_s: 0.980190 };
        if (val <= 669000.0) return { modc_s: 0.979921, tplbi_f: 1.045705, tplbi_s: 0.980190 };
        if (val <= 679000.0) return { modc_s: 1.000000, tplbi_f: 1.045705, tplbi_s: 0.980190 };
        if (val <= 689000.0) return { modc_s: 1.000000, tplbi_f: 1.045705, tplbi_s: 0.980190 };
        if (val <= 699000.0) return { modc_s: 1.000000, tplbi_f: 1.045705, tplbi_s: 0.980190 };
        if (val <= 709000.0) return { modc_s: 1.000000, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 719000.0) return { modc_s: 1.000000, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 729000.0) return { modc_s: 1.000000, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 739000.0) return { modc_s: 1.000000, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 749000.0) return { modc_s: 1.008776, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 759000.0) return { modc_s: 1.024335, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 769000.0) return { modc_s: 1.073029, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 779000.0) return { modc_s: 1.112947, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 789000.0) return { modc_s: 1.146082, tplbi_f: 1.091455, tplbi_s: 0.980190 };
        if (val <= 799000.0) return { modc_s: 1.151046, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 809000.0) return { modc_s: 1.156010, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 819000.0) return { modc_s: 1.160974, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 828000.0) return { modc_s: 1.160974, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 839000.0) return { modc_s: 1.160974, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 849000.0) return { modc_s: 1.160974, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 859000.0) return { modc_s: 1.160974, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 869000.0) return { modc_s: 1.160974, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 879000.0) return { modc_s: 1.160974, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 889000.0) return { modc_s: 1.177674, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 899000.0) return { modc_s: 1.194374, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 909000.0) return { modc_s: 1.211074, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 919000.0) return { modc_s: 1.211074, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 929000.0) return { modc_s: 1.222777, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 939000.0) return { modc_s: 1.240842, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 949000.0) return { modc_s: 1.258907, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 959000.0) return { modc_s: 1.265269, tplbi_f: 1.023960, tplbi_s: 0.980190 };
        if (val <= 969000.0) return { modc_s: 1.265269, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 979000.0) return { modc_s: 1.265269, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 989000.0) return { modc_s: 1.265269, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 999000.0) return { modc_s: 1.265269, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1009000.0) return { modc_s: 1.265269, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1019000.0) return { modc_s: 1.265269, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1030000.0) return { modc_s: 1.279730, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1039000.0) return { modc_s: 1.294191, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1050000.0) return { modc_s: 1.308652, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1069000.0) return { modc_s: 1.321207, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1080000.0) return { modc_s: 1.333761, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1088000.0) return { modc_s: 1.346316, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1099000.0) return { modc_s: 1.346316, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1119000.0) return { modc_s: 1.346316, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1120000.0) return { modc_s: 1.346316, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1130000.0) return { modc_s: 1.384462, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1138000.0) return { modc_s: 1.422608, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1158000.0) return { modc_s: 1.460754, tplbi_f: 1.023960, tplbi_s: 0.977436 };
        if (val <= 1169000.0) return { modc_s: 1.460754, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1178000.0) return { modc_s: 1.462204, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1190000.0) return { modc_s: 1.463653, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1199000.0) return { modc_s: 1.471939, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1218000.0) return { modc_s: 1.508662, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1228000.0) return { modc_s: 1.545384, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1238000.0) return { modc_s: 1.575269, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1250000.0) return { modc_s: 1.586528, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1259000.0) return { modc_s: 1.586528, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1280000.0) return { modc_s: 1.597787, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1290000.0) return { modc_s: 1.612891, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1299000.0) return { modc_s: 1.616737, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1320000.0) return { modc_s: 1.616737, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1328000.0) return { modc_s: 1.620582, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1338000.0) return { modc_s: 1.620582, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1360000.0) return { modc_s: 1.620582, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1369000.0) return { modc_s: 1.620582, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1380000.0) return { modc_s: 1.683483, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1390000.0) return { modc_s: 1.746385, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1398000.0) return { modc_s: 1.843024, tplbi_f: 1.023960, tplbi_s: 0.954357 };
        if (val <= 1420000.0) return { modc_s: 1.887756, tplbi_f: 1.023960, tplbi_s: 0.938836 };
        if (val <= 1450000.0) return { modc_s: 1.934974, tplbi_f: 1.023960, tplbi_s: 0.938836 };
        if (val <= 1470000.0) return { modc_s: 1.948454, tplbi_f: 1.023960, tplbi_s: 0.938836 };
        if (val <= 1490000.0) return { modc_s: 1.950939, tplbi_f: 1.023960, tplbi_s: 0.938836 };
        if (val <= 1500000.0) return { modc_s: 1.950939, tplbi_f: 1.023960, tplbi_s: 0.938836 };
        if (val <= 1520000.0) return { modc_s: 1.950939, tplbi_f: 1.023960, tplbi_s: 0.938836 };
        if (val <= 1548000.0) return { modc_s: 1.950939, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1560000.0) return { modc_s: 1.950939, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1590000.0) return { modc_s: 1.950939, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1600000.0) return { modc_s: 1.950939, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1620000.0) return { modc_s: 1.950939, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1630000.0) return { modc_s: 1.950939, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1650000.0) return { modc_s: 1.950939, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1660000.0) return { modc_s: 1.950939, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1680000.0) return { modc_s: 2.001843, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1690000.0) return { modc_s: 2.052748, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1710000.0) return { modc_s: 2.103652, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1720000.0) return { modc_s: 2.103652, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1730000.0) return { modc_s: 2.125079, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1750000.0) return { modc_s: 2.146506, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1770000.0) return { modc_s: 2.146506, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1780000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1790000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1800000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1810000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1820000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1830000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1850000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1860000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1880000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1890000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1920000.0) return { modc_s: 2.167933, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1930000.0) return { modc_s: 2.176578, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1950000.0) return { modc_s: 2.185223, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1980000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 1990000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 2020000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 2030000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 2050000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 2070000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.938836 };
        if (val <= 2090000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2100000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2130000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2150000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2180000.0) return { modc_s: 2.193868, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2190000.0) return { modc_s: 2.203150, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2210000.0) return { modc_s: 2.220298, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2230000.0) return { modc_s: 2.237445, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2240000.0) return { modc_s: 2.245311, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2250000.0) return { modc_s: 2.251603, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2270000.0) return { modc_s: 2.321299, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2290000.0) return { modc_s: 2.390995, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2310000.0) return { modc_s: 2.390995, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2330000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2350000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2370000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2390000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2410000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2430000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2450000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2480000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2490000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2510000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.940366 };
        if (val <= 2520000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.992916 };
        if (val <= 2540000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.992916 };
        if (val <= 2550000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.992916 };
        if (val <= 2580000.0) return { modc_s: 2.454399, tplbi_f: 0.986040, tplbi_s: 0.992916 };
        if (val <= 2620000.0) return { modc_s: 2.454399, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2630000.0) return { modc_s: 2.454399, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2650000.0) return { modc_s: 2.454399, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2660000.0) return { modc_s: 2.454399, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2680000.0) return { modc_s: 2.454399, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2690000.0) return { modc_s: 2.454399, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2710000.0) return { modc_s: 2.454399, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2723000.0) return { modc_s: 2.454399, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2750000.0) return { modc_s: 2.478319, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2790000.0) return { modc_s: 2.502239, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2800000.0) return { modc_s: 2.526159, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2820000.0) return { modc_s: 2.556762, tplbi_f: 0.959561, tplbi_s: 0.992916 };
        if (val <= 2830000.0) return { modc_s: 2.556762, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 2850000.0) return { modc_s: 2.587366, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 2860000.0) return { modc_s: 2.587366, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 2880000.0) return { modc_s: 2.647565, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 2910000.0) return { modc_s: 2.647565, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 2930000.0) return { modc_s: 2.677160, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 2950000.0) return { modc_s: 2.706757, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 2990000.0) return { modc_s: 2.715572, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3020000.0) return { modc_s: 2.724387, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3050000.0) return { modc_s: 2.733200, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3090000.0) return { modc_s: 2.733200, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3120000.0) return { modc_s: 2.733740, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3160000.0) return { modc_s: 2.734280, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3170000.0) return { modc_s: 2.734280, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3180000.0) return { modc_s: 2.734820, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3200000.0) return { modc_s: 2.734820, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3250000.0) return { modc_s: 2.734820, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3290000.0) return { modc_s: 2.734820, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3310000.0) return { modc_s: 2.734820, tplbi_f: 0.959561, tplbi_s: 1.118383 };
        if (val <= 3330000.0) return { modc_s: 2.818802, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3380000.0) return { modc_s: 2.902784, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3390000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3420000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3430000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3480000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3490000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3500000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3550000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3580000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3600000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3630000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3660000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3670000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3680000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3730000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3770000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3800000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3850000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3920000.0) return { modc_s: 2.986766, tplbi_f: 0.900467, tplbi_s: 1.118383 };
        if (val <= 3950000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 3980000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4080000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4120000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4150000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4210000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4230000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4250000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4290000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4330000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4380000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4460000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4500000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4530000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4570000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4580000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4640000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4650000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4690000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4790000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4830000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4880000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4950000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 4990000.0) return { modc_s: 2.986766, tplbi_f: 0.867970, tplbi_s: 1.118383 };
        if (val <= 5050000.0) return { modc_s: 2.986766, tplbi_f: 0.821877, tplbi_s: 1.118383 };
        if (val <= 5120000.0) return { modc_s: 2.986766, tplbi_f: 0.821877, tplbi_s: 1.118383 };
        if (val <= 5190000.0) return { modc_s: 2.986766, tplbi_f: 0.821877, tplbi_s: 1.118383 };
        if (val <= 5250000.0) return { modc_s: 2.986766, tplbi_f: 0.821877, tplbi_s: 1.118383 };
        if (val <= 5310000.0) return { modc_s: 2.986766, tplbi_f: 0.821877, tplbi_s: 1.118383 };
        if (val <= 5350000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5390000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5460000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5480000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5550000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5560000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5690000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5700000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5760000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5810000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5880000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 5960000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6080000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6100000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6180000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6260000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6280000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6350000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6430000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6450000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6530000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6580000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6630000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6680000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6720000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6780000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6800000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6880000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6890000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 6980000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7080000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7200000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7280000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7300000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7380000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7550000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7580000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7640000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7680000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7780000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7880000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 7960000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 8180000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 8480000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 8520000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 8650000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 8660000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 8750000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 8880000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 9170000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 9250000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 9370000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 9580000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 9680000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 9690000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 9890000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 10180000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 10288000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 10380000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 10680000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 10980000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 11250000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 11680000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 11980000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 12000000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 12300000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 12580000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 12800000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 13200000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 13380000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 13750000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 13800000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 14200000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 14800000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 15500000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 15800000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 16000000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 16800000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 17880000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 18380000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 18880000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 19300000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 20000000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 20980000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 21150000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 21880000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 22000000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 23000000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 23930000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 25380000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 26918000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        if (val <= 30000000.0) return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
        return { modc_s: 2.986766, tplbi_f: 0.790928, tplbi_s: 1.118383 };
    },
    com_ru1: function(val) {
        if (val <= 2.0) return { modb_s: 0.754086 };
        if (val <= 3.0) return { modb_s: 0.754086 };
        if (val <= 4.0) return { modb_s: 0.754086 };
        if (val <= 5.0) return { modb_s: 0.754086 };
        if (val <= 6.0) return { modb_s: 0.754086 };
        if (val <= 7.0) return { modb_s: 0.754086 };
        if (val <= 8.0) return { modb_s: 0.754086 };
        if (val <= 9.0) return { modb_s: 0.754086 };
        if (val <= 10.0) return { modb_s: 0.754086 };
        if (val <= 11.0) return { modb_s: 0.754086 };
        if (val <= 12.0) return { modb_s: 0.754086 };
        if (val <= 13.0) return { modb_s: 0.796182 };
        if (val <= 14.0) return { modb_s: 0.796182 };
        if (val <= 15.0) return { modb_s: 0.804776 };
        if (val <= 16.0) return { modb_s: 0.804776 };
        if (val <= 17.0) return { modb_s: 0.857422 };
        if (val <= 18.0) return { modb_s: 0.905632 };
        if (val <= 19.0) return { modb_s: 0.931083 };
        if (val <= 20.0) return { modb_s: 1.000000 };
        if (val <= 21.0) return { modb_s: 1.058100 };
        if (val <= 22.0) return { modb_s: 1.074794 };
        if (val <= 23.0) return { modb_s: 1.162165 };
        if (val <= 24.0) return { modb_s: 1.381357 };
        if (val <= 25.0) return { modb_s: 1.407572 };
        if (val <= 26.0) return { modb_s: 1.511941 };
        if (val <= 27.0) return { modb_s: 1.593693 };
        if (val <= 28.0) return { modb_s: 1.713407 };
        if (val <= 29.0) return { modb_s: 1.713407 };
        if (val <= 30.0) return { modb_s: 1.892326 };
        if (val <= 31.0) return { modb_s: 1.892326 };
        if (val <= 32.0) return { modb_s: 1.938769 };
        if (val <= 33.0) return { modb_s: 1.984110 };
        if (val <= 34.0) return { modb_s: 1.992598 };
        if (val <= 35.0) return { modb_s: 2.068006 };
        if (val <= 36.0) return { modb_s: 2.153895 };
        if (val <= 37.0) return { modb_s: 2.153895 };
        if (val <= 38.0) return { modb_s: 2.485282 };
        if (val <= 39.0) return { modb_s: 2.583638 };
        if (val <= 40.0) return { modb_s: 2.595305 };
        if (val <= 41.0) return { modb_s: 2.595305 };
        if (val <= 42.0) return { modb_s: 2.595305 };
        if (val <= 43.0) return { modb_s: 2.595305 };
        if (val <= 44.0) return { modb_s: 2.595305 };
        if (val <= 45.0) return { modb_s: 2.595305 };
        if (val <= 46.0) return { modb_s: 2.595305 };
        if (val <= 47.0) return { modb_s: 2.595305 };
        if (val <= 48.0) return { modb_s: 2.595305 };
        if (val <= 49.0) return { modb_s: 2.595305 };
        if (val <= 50.0) return { modb_s: 2.595305 };
        if (val <= 51.0) return { modb_s: 2.595305 };
        if (val <= 52.0) return { modb_s: 2.595305 };
        if (val <= 53.0) return { modb_s: 2.595305 };
        if (val <= 54.0) return { modb_s: 2.595305 };
        if (val <= 55.0) return { modb_s: 2.595305 };
        if (val <= 56.0) return { modb_s: 2.595305 };
        if (val <= 58.0) return { modb_s: 2.595305 };
        if (val <= 59.0) return { modb_s: 2.595305 };
        if (val <= 60.0) return { modb_s: 2.595305 };
        if (val <= 62.0) return { modb_s: 2.595305 };
        if (val <= 65.0) return { modb_s: 2.595305 };
        if (val <= 66.0) return { modb_s: 2.595305 };
        return { modb_s: 2.595305 };
    },
    tft_ru1: function(val) {
        if (val <= 5.0) return { modc_s: 1.000000 };
        if (val <= 6.0) return { modc_s: 1.000000 };
        if (val <= 7.0) return { modc_s: 1.000000 };
        if (val <= 8.0) return { modc_s: 1.000000 };
        if (val <= 9.0) return { modc_s: 1.000000 };
        if (val <= 10.0) return { modc_s: 1.000000 };
        if (val <= 11.0) return { modc_s: 1.000000 };
        if (val <= 12.0) return { modc_s: 1.000000 };
        if (val <= 15.0) return { modc_s: 1.081588 };
        if (val <= 16.0) return { modc_s: 1.081588 };
        if (val <= 17.0) return { modc_s: 1.143353 };
        return { modc_s: 1.143353 };
    },
    sales_channel: {
        "缺失值": { modb_f: 0.831223, modc_f: 0.957631, modc_s: 1.015774, tplpd_f: 0.624796, tplpd_s: 1.011509, tplbi_f: 0.946552 },
        "01.員工招攬(ZZAK)": { modb_f: 0.828037, modc_f: 0.953289, modc_s: 1.015774, tplpd_f: 0.959431, tplpd_s: 1.011509, tplbi_f: 0.969252 },
        "02.員工招攬(直接業務)": { modb_f: 0.839287, modc_f: 0.964356, modc_s: 1.029506, tplpd_f: 0.986603, tplpd_s: 1.019327, tplbi_f: 0.997464 },
        "03.集團業務_其他": { modb_f: 0.763425, modc_f: 0.892262, modc_s: 1.015774, tplpd_f: 0.882823, tplpd_s: 1.011509, tplbi_f: 0.859181 },
        "03.集團跨售_人壽": { modb_f: 0.903539, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 },
        "04.富邦保代": { modb_f: 0.828423, modc_f: 1.003948, modc_s: 1.026277, tplpd_f: 1.084353, tplpd_s: 1.009213, tplbi_f: 0.921418 },
        "05.車商保經代": { modb_f: 1.000000, modc_f: 0.993884, modc_s: 1.015774, tplpd_f: 0.950167, tplpd_s: 1.032252, tplbi_f: 0.936386 },
        "06.金融保經代": { modb_f: 0.770740, modc_f: 0.862706, modc_s: 1.015774, tplpd_f: 0.895414, tplpd_s: 1.011509, tplbi_f: 0.946552 },
        "07.壽險保經代": { modb_f: 0.854393, modc_f: 0.992147, modc_s: 1.015774, tplpd_f: 0.992715, tplpd_s: 1.021111, tplbi_f: 1.018773 },
        "08.國際性經代公司": { modb_f: 0.808682, modc_f: 0.957631, modc_s: 1.015774, tplpd_f: 0.937104, tplpd_s: 1.011509, tplbi_f: 0.946552 },
        "09.一般經代": { modb_f: 0.867013, modc_f: 0.997127, modc_s: 1.015774, tplpd_f: 0.986500, tplpd_s: 1.023647, tplbi_f: 0.946765 },
        "10.代檢、監理": { modb_f: 0.811383, modc_f: 0.872005, modc_s: 1.015774, tplpd_f: 0.925500, tplpd_s: 1.046014, tplbi_f: 0.971234 },
        "11.中古車貿易商": { modb_f: 0.938430, modc_f: 0.945950, modc_s: 1.015774, tplpd_f: 0.952583, tplpd_s: 0.972856, tplbi_f: 1.006906 },
        "12.大車業務": { modb_f: 0.836419, modc_f: 0.879296, modc_s: 1.015774, tplpd_f: 0.979826, tplpd_s: 1.013407, tplbi_f: 0.946552 },
        "13.長租車公司": { modb_f: 0.831223, modc_f: 0.957631, modc_s: 1.015774, tplpd_f: 0.951663, tplpd_s: 1.011509, tplbi_f: 0.946552 },
        "14.機車經銷商": { modb_f: 0.805081, modc_f: 0.860540, modc_s: 1.015774, tplpd_f: 0.877848, tplpd_s: 1.074413, tplbi_f: 0.914681 },
        "15.金融機構": { modb_f: 0.893796, modc_f: 0.960601, modc_s: 1.015774, tplpd_f: 0.984047, tplpd_s: 1.011509, tplbi_f: 0.963829 },
        "16.招標業務": { modb_f: 0.831223, modc_f: 0.957631, modc_s: 1.015774, tplpd_f: 0.624796, tplpd_s: 1.011509, tplbi_f: 0.946552 },
        "17.電話行銷": { modb_f: 1.000000, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 0.940496, tplpd_s: 1.011509, tplbi_f: 0.946552 },
        "18.客戶自行投保_其他": { modb_f: 0.831223, modc_f: 0.957631, modc_s: 1.015774, tplpd_f: 0.951663, tplpd_s: 1.011509, tplbi_f: 0.946552 },
        "18.客戶自行投保_官網": { modb_f: 0.774579, modc_f: 0.990351, modc_s: 1.015774, tplpd_f: 0.827148, tplpd_s: 0.979825, tplbi_f: 0.833363 },
        "18.客戶自行投保_臨櫃": { modb_f: 0.814894, modc_f: 0.951884, modc_s: 1.015774, tplpd_f: 0.964219, tplpd_s: 1.001297, tplbi_f: 0.892294 },
        "19.其它通路": { modb_f: 0.908895, modc_f: 0.957631, modc_s: 1.055434, tplpd_f: 0.993801, tplpd_s: 1.016022, tplbi_f: 0.998046 },
        "23.富昇保代": { modb_f: 0.831223, modc_f: 0.957631, modc_s: 1.015774, tplpd_f: 0.951663, tplpd_s: 1.011509, tplbi_f: 0.946552 }
    },
    resp_rank: {
        "0": { modb_s: 1.000000, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 },
        "1": { modb_s: 1.000000, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000 },
        "2": { modb_s: 1.012774, modc_f: 1.115928, modc_s: 1.000000, tplpd_f: 1.306646, tplpd_s: 1.033831, tplbi_f: 1.209132 },
        "3": { modb_s: 1.012774, modc_f: 1.195445, modc_s: 1.000000, tplpd_f: 1.406435, tplpd_s: 1.035361, tplbi_f: 1.350466 },
        "4": { modb_s: 1.030391, modc_f: 1.263725, modc_s: 1.026308, tplpd_f: 1.570662, tplpd_s: 1.046286, tplbi_f: 1.509770 },
        "5": { modb_s: 1.045185, modc_f: 1.557966, modc_s: 1.061495, tplpd_f: 1.850461, tplpd_s: 1.046286, tplbi_f: 1.840426 },
        "6": { modb_s: 1.174246, modc_f: 1.615564, modc_s: 1.063671, tplpd_f: 2.065507, tplpd_s: 1.049678, tplbi_f: 2.015502 },
        "7": { modb_s: 1.186200, modc_f: 1.720104, modc_s: 1.063671, tplpd_f: 2.353239, tplpd_s: 1.049678, tplbi_f: 2.216504 },
        "8": { modb_s: 1.190455, modc_f: 1.814518, modc_s: 1.087725, tplpd_f: 2.400036, tplpd_s: 1.064804, tplbi_f: 2.216504 },
        "9": { modb_s: 1.288996, modc_f: 1.992852, modc_s: 1.093144, tplpd_f: 2.799692, tplpd_s: 1.081254, tplbi_f: 2.792657 },
        "10": { modb_s: 1.288996, modc_f: 1.992852, modc_s: 1.093144, tplpd_f: 2.995038, tplpd_s: 1.081254, tplbi_f: 2.810557 },
        "11": { modb_s: 1.288996, modc_f: 2.257958, modc_s: 1.093144, tplpd_f: 3.203624, tplpd_s: 1.081254, tplbi_f: 2.810557 },
        "12": { modb_s: 1.288996, modc_f: 2.257958, modc_s: 1.101834, tplpd_f: 3.317941, tplpd_s: 1.081254, tplbi_f: 3.368479 },
        "13": { modb_s: 1.288996, modc_f: 2.480383, modc_s: 1.101834, tplpd_f: 3.733475, tplpd_s: 1.081254, tplbi_f: 3.530355 },
        "14": { modb_s: 1.288996, modc_f: 2.480383, modc_s: 1.101834, tplpd_f: 3.684633, tplpd_s: 1.081254, tplbi_f: 3.530355 },
        "15": { modb_s: 1.288996, modc_f: 2.570376, modc_s: 1.101834, tplpd_f: 4.001804, tplpd_s: 1.081254, tplbi_f: 3.610452 },
        "16": { modb_s: 1.288996, modc_f: 2.823231, modc_s: 1.101834, tplpd_f: 4.488968, tplpd_s: 1.081254, tplbi_f: 3.610452 },
        "17": { modb_s: 1.288996, modc_f: 3.038635, modc_s: 1.101834, tplpd_f: 4.590186, tplpd_s: 1.081254, tplbi_f: 5.138352 },
        "18": { modb_s: 1.288996, modc_f: 3.151350, modc_s: 1.101834, tplpd_f: 5.351325, tplpd_s: 1.081254, tplbi_f: 5.800179 },
        "19": { modb_s: 1.288996, modc_f: 3.191504, modc_s: 1.101834, tplpd_f: 6.593516, tplpd_s: 1.081254, tplbi_f: 6.424506 },
        "缺失值": { modb_s: 1.021676, modc_f: 1.095431, modc_s: 1.012931, tplpd_f: 1.160390, tplpd_s: 1.020787, tplbi_f: 1.141350 }
    },
    pol_cy: {
        "2019": { modb_f: 0.834129, modb_s: 0.925312, modc_f: 0.967997, modc_s: 0.852920, tplpd_f: 0.856349, tplpd_s: 0.910922, tplbi_f: 0.892026, tplbi_s: 1.190345 },
        "2020": { modb_f: 1.199818, modb_s: 0.807523, modc_f: 0.999224, modc_s: 0.852920, tplpd_f: 0.994085, tplpd_s: 0.882022, tplbi_f: 0.971893, tplbi_s: 1.117483 },
        "2021": { modb_f: 1.018791, modb_s: 0.855361, modc_f: 0.869097, modc_s: 0.908168, tplpd_f: 0.838787, tplpd_s: 0.929498, tplbi_f: 0.861283, tplbi_s: 1.170843 },
        "2022": { modb_f: 1.042213, modb_s: 0.942410, modc_f: 0.966910, modc_s: 0.963705, tplpd_f: 0.904505, tplpd_s: 1.006830, tplbi_f: 0.899019, tplbi_s: 1.170843 },
        "2023": { modb_f: 1.000000, modb_s: 1.000000, modc_f: 1.000000, modc_s: 1.000000, tplpd_f: 1.000000, tplpd_s: 1.000000, tplbi_f: 1.000000, tplbi_s: 1.000000 }
    },
    renew_flag: {
        "N": { tplpd_f: 1.083859, tplpd_s: 1.013670 },
        "Y": { tplpd_f: 1.000000, tplpd_s: 1.000000 }
    },
    sec_eip: {
        "缺失值": { tplpd_f: 0.739019 },
        "N": { tplpd_f: 1.000000 },
        "Y": { tplpd_f: 1.045022 }
    },
    tdir_flag: {
        "N": { tplbi_s: 1.000000 },
        "Y": { tplbi_s: 0.949440 }
    },
    exliab_flag: {
        "N": { modb_s: 0.931387, modc_f: 0.937121, tplpd_f: 0.875084, tplbi_f: 0.909796 },
        "Y": { modb_s: 1.000000, modc_f: 1.000000, tplpd_f: 1.000000, tplbi_f: 1.000000 }
    },
    excess_amt: {
        "0": { modb_f: 1.000000 },
        "8000": { modb_f: 0.771504 },
        "10000": { modb_f: 0.543851 },
        "15000": { modb_f: 0.464374 },
        "20000": { modb_f: 0.414024 }
    },
    total_insured: function(val) {
        if (val <= 0.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 1.000000, modc_s: 1.000000, tplpd_s: 1.091578 };
        if (val <= 3000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.659566, modc_s: 0.541533, tplpd_s: 1.091578 };
        if (val <= 11000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 1.091578 };
        if (val <= 13000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 1.091578 };
        if (val <= 22000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 1.091578 };
        if (val <= 27000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 1.091578 };
        if (val <= 31000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 1.091578 };
        if (val <= 32000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 1.091578 };
        if (val <= 44000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 1.091578 };
        if (val <= 50000.0) return { modb_f: 1.000000, modb_s: 1.000000, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 0.867547 };
        if (val <= 51000.0) return { modb_f: 0.772554, modb_s: 0.628669, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 0.867547 };
        if (val <= 55000.0) return { modb_f: 0.772554, modb_s: 0.628669, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 0.867547 };
        if (val <= 55200.0) return { modb_f: 0.772554, modb_s: 0.628669, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 0.867547 };
        if (val <= 60000.0) return { modb_f: 0.772554, modb_s: 0.628669, modc_f: 0.489349, modc_s: 0.312299, tplpd_s: 0.867547 };
        if (val <= 63000.0) return { modb_f: 0.772554, modb_s: 0.628669, modc_f: 0.497524, modc_s: 0.312299, tplpd_s: 0.867547 };
        if (val <= 70000.0) return { modb_f: 0.772554, modb_s: 0.628669, modc_f: 0.505698, modc_s: 0.312299, tplpd_s: 0.867547 };
        if (val <= 75000.0) return { modb_f: 0.658831, modb_s: 0.443004, modc_f: 0.513872, modc_s: 0.314672, tplpd_s: 0.867547 };
        if (val <= 80000.0) return { modb_f: 0.658831, modb_s: 0.443004, modc_f: 0.513872, modc_s: 0.314672, tplpd_s: 0.867547 };
        if (val <= 83000.0) return { modb_f: 0.658831, modb_s: 0.443004, modc_f: 0.513872, modc_s: 0.317044, tplpd_s: 0.867547 };
        if (val <= 88000.0) return { modb_f: 0.658831, modb_s: 0.443004, modc_f: 0.519226, modc_s: 0.319417, tplpd_s: 0.867547 };
        if (val <= 90000.0) return { modb_f: 0.658831, modb_s: 0.443004, modc_f: 0.519226, modc_s: 0.319417, tplpd_s: 0.867547 };
        if (val <= 93000.0) return { modb_f: 0.675727, modb_s: 0.443348, modc_f: 0.524579, modc_s: 0.322196, tplpd_s: 0.867547 };
        if (val <= 95000.0) return { modb_f: 0.675727, modb_s: 0.443348, modc_f: 0.524579, modc_s: 0.322196, tplpd_s: 0.867547 };
        if (val <= 96000.0) return { modb_f: 0.702730, modb_s: 0.443692, modc_f: 0.524579, modc_s: 0.322196, tplpd_s: 0.867547 };
        if (val <= 97500.0) return { modb_f: 0.702730, modb_s: 0.443692, modc_f: 0.524579, modc_s: 0.322196, tplpd_s: 0.867547 };
        if (val <= 100000.0) return { modb_f: 0.702730, modb_s: 0.443692, modc_f: 0.529933, modc_s: 0.324976, tplpd_s: 0.867547 };
        if (val <= 101500.0) return { modb_f: 0.702730, modb_s: 0.443692, modc_f: 0.529933, modc_s: 0.324976, tplpd_s: 1.000000 };
        if (val <= 103000.0) return { modb_f: 0.702730, modb_s: 0.443692, modc_f: 0.529933, modc_s: 0.324976, tplpd_s: 1.000000 };
        if (val <= 106000.0) return { modb_f: 0.702730, modb_s: 0.443692, modc_f: 0.529933, modc_s: 0.324976, tplpd_s: 1.000000 };
        if (val <= 110000.0) return { modb_f: 0.729733, modb_s: 0.444035, modc_f: 0.529933, modc_s: 0.327755, tplpd_s: 1.000000 };
        if (val <= 115000.0) return { modb_f: 0.729733, modb_s: 0.444035, modc_f: 0.529933, modc_s: 0.327755, tplpd_s: 1.000000 };
        if (val <= 117000.0) return { modb_f: 0.729733, modb_s: 0.444035, modc_f: 0.529933, modc_s: 0.327755, tplpd_s: 1.000000 };
        if (val <= 120000.0) return { modb_f: 0.729733, modb_s: 0.444035, modc_f: 0.529933, modc_s: 0.327755, tplpd_s: 1.000000 };
        if (val <= 123000.0) return { modb_f: 0.729733, modb_s: 0.444035, modc_f: 0.529933, modc_s: 0.327755, tplpd_s: 1.000000 };
        if (val <= 127000.0) return { modb_f: 0.729733, modb_s: 0.444035, modc_f: 0.538283, modc_s: 0.327755, tplpd_s: 1.000000 };
        if (val <= 129000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.546633, modc_s: 0.327755, tplpd_s: 1.000000 };
        if (val <= 130000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.546633, modc_s: 0.327755, tplpd_s: 1.000000 };
        if (val <= 135000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.554983, modc_s: 0.329131, tplpd_s: 1.000000 };
        if (val <= 136000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.554983, modc_s: 0.329131, tplpd_s: 1.000000 };
        if (val <= 140000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.554983, modc_s: 0.329131, tplpd_s: 1.000000 };
        if (val <= 143000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.554983, modc_s: 0.329131, tplpd_s: 1.000000 };
        if (val <= 144000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.554983, modc_s: 0.330507, tplpd_s: 1.000000 };
        if (val <= 146000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.554983, modc_s: 0.330507, tplpd_s: 1.000000 };
        if (val <= 150000.0) return { modb_f: 0.739840, modb_s: 0.444035, modc_f: 0.554983, modc_s: 0.330507, tplpd_s: 1.000000 };
        if (val <= 152000.0) return { modb_f: 0.758424, modb_s: 0.453136, modc_f: 0.554983, modc_s: 0.332462, tplpd_s: 1.000000 };
        if (val <= 153000.0) return { modb_f: 0.758424, modb_s: 0.453136, modc_f: 0.554983, modc_s: 0.332462, tplpd_s: 1.000000 };
        if (val <= 155000.0) return { modb_f: 0.781846, modb_s: 0.470726, modc_f: 0.554983, modc_s: 0.333042, tplpd_s: 1.000000 };
        if (val <= 159000.0) return { modb_f: 0.781846, modb_s: 0.470726, modc_f: 0.555982, modc_s: 0.333621, tplpd_s: 1.000000 };
        if (val <= 160000.0) return { modb_f: 0.781846, modb_s: 0.470726, modc_f: 0.555982, modc_s: 0.333621, tplpd_s: 1.000000 };
        if (val <= 167000.0) return { modb_f: 0.781846, modb_s: 0.470726, modc_f: 0.556982, modc_s: 0.337013, tplpd_s: 1.000000 };
        if (val <= 170000.0) return { modb_f: 0.781846, modb_s: 0.470726, modc_f: 0.556982, modc_s: 0.337013, tplpd_s: 1.000000 };
        if (val <= 174000.0) return { modb_f: 0.781846, modb_s: 0.470726, modc_f: 0.556982, modc_s: 0.337013, tplpd_s: 1.000000 };
        if (val <= 175000.0) return { modb_f: 0.781846, modb_s: 0.470726, modc_f: 0.557982, modc_s: 0.340405, tplpd_s: 1.000000 };
        if (val <= 175800.0) return { modb_f: 0.781846, modb_s: 0.470726, modc_f: 0.557982, modc_s: 0.340405, tplpd_s: 1.000000 };
        if (val <= 179000.0) return { modb_f: 0.820424, modb_s: 0.488317, modc_f: 0.557982, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 180000.0) return { modb_f: 0.820424, modb_s: 0.488317, modc_f: 0.557982, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 182000.0) return { modb_f: 0.840417, modb_s: 0.496808, modc_f: 0.557982, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 183000.0) return { modb_f: 0.840417, modb_s: 0.496808, modc_f: 0.557982, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 186000.0) return { modb_f: 0.840417, modb_s: 0.496808, modc_f: 0.557982, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 190000.0) return { modb_f: 0.840417, modb_s: 0.496808, modc_f: 0.563932, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 192500.0) return { modb_f: 0.840417, modb_s: 0.496808, modc_f: 0.563932, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 196000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.569882, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 200000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.569882, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 201000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.000000 };
        if (val <= 202000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 203000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 206000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 210000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 211000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 213000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 214000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 215000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 218000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 220000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 223000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 224000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 226500.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 230000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.575833, modc_s: 0.343796, tplpd_s: 1.057989 };
        if (val <= 231000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.577421, modc_s: 0.344686, tplpd_s: 1.057989 };
        if (val <= 233000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.577421, modc_s: 0.344686, tplpd_s: 1.057989 };
        if (val <= 236000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.579009, modc_s: 0.345576, tplpd_s: 1.057989 };
        if (val <= 241000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.579009, modc_s: 0.345576, tplpd_s: 1.057989 };
        if (val <= 243000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.580597, modc_s: 0.346465, tplpd_s: 1.057989 };
        if (val <= 245000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.580597, modc_s: 0.346465, tplpd_s: 1.057989 };
        if (val <= 247000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.580597, modc_s: 0.348404, tplpd_s: 1.057989 };
        if (val <= 250000.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.580597, modc_s: 0.348404, tplpd_s: 1.057989 };
        if (val <= 250500.0) return { modb_f: 0.855573, modb_s: 0.496808, modc_f: 0.580597, modc_s: 0.348404, tplpd_s: 1.065525 };
        if (val <= 252000.0) return { modb_f: 0.860702, modb_s: 0.502552, modc_f: 0.584754, modc_s: 0.350343, tplpd_s: 1.065525 };
        if (val <= 254500.0) return { modb_f: 0.860702, modb_s: 0.502552, modc_f: 0.584754, modc_s: 0.350343, tplpd_s: 1.065525 };
        if (val <= 256000.0) return { modb_f: 0.860702, modb_s: 0.502552, modc_f: 0.588910, modc_s: 0.352373, tplpd_s: 1.065525 };
        if (val <= 263000.0) return { modb_f: 0.873538, modb_s: 0.508549, modc_f: 0.593067, modc_s: 0.352464, tplpd_s: 1.065525 };
        if (val <= 265000.0) return { modb_f: 0.873538, modb_s: 0.508549, modc_f: 0.593067, modc_s: 0.352464, tplpd_s: 1.065525 };
        if (val <= 267000.0) return { modb_f: 0.873538, modb_s: 0.508549, modc_f: 0.593067, modc_s: 0.352554, tplpd_s: 1.065525 };
        if (val <= 270000.0) return { modb_f: 0.873538, modb_s: 0.508549, modc_f: 0.593067, modc_s: 0.352554, tplpd_s: 1.065525 };
        if (val <= 272000.0) return { modb_f: 0.893220, modb_s: 0.514547, modc_f: 0.593067, modc_s: 0.352554, tplpd_s: 1.065525 };
        if (val <= 278000.0) return { modb_f: 0.893220, modb_s: 0.514547, modc_f: 0.593067, modc_s: 0.352554, tplpd_s: 1.065525 };
        if (val <= 280000.0) return { modb_f: 0.893220, modb_s: 0.514547, modc_f: 0.593067, modc_s: 0.352554, tplpd_s: 1.065525 };
        if (val <= 283500.0) return { modb_f: 0.893220, modb_s: 0.514547, modc_f: 0.593067, modc_s: 0.352554, tplpd_s: 1.065525 };
        if (val <= 286000.0) return { modb_f: 0.893220, modb_s: 0.514547, modc_f: 0.593067, modc_s: 0.352971, tplpd_s: 1.065525 };
        if (val <= 290000.0) return { modb_f: 0.893220, modb_s: 0.514547, modc_f: 0.593067, modc_s: 0.352971, tplpd_s: 1.065525 };
        if (val <= 291000.0) return { modb_f: 0.907774, modb_s: 0.514800, modc_f: 0.593067, modc_s: 0.353388, tplpd_s: 1.065525 };
        if (val <= 295000.0) return { modb_f: 0.907774, modb_s: 0.514800, modc_f: 0.593067, modc_s: 0.353388, tplpd_s: 1.065525 };
        if (val <= 297000.0) return { modb_f: 0.914619, modb_s: 0.514800, modc_f: 0.596074, modc_s: 0.353804, tplpd_s: 1.065525 };
        if (val <= 300000.0) return { modb_f: 0.914619, modb_s: 0.514800, modc_f: 0.596074, modc_s: 0.353804, tplpd_s: 1.065525 };
        if (val <= 301000.0) return { modb_f: 0.914619, modb_s: 0.514800, modc_f: 0.599081, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 302000.0) return { modb_f: 0.914619, modb_s: 0.514800, modc_f: 0.599081, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 305000.0) return { modb_f: 0.914619, modb_s: 0.514800, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 306000.0) return { modb_f: 0.914619, modb_s: 0.514800, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 308000.0) return { modb_f: 0.914619, modb_s: 0.514800, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 310000.0) return { modb_f: 0.914619, modb_s: 0.517592, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 312000.0) return { modb_f: 0.914619, modb_s: 0.517592, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 318000.0) return { modb_f: 0.914619, modb_s: 0.517592, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 320000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 323000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 326000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 327000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 330000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 334000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 335000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 338000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 340000.0) return { modb_f: 0.924095, modb_s: 0.520385, modc_f: 0.602088, modc_s: 0.353804, tplpd_s: 1.077262 };
        if (val <= 342000.0) return { modb_f: 0.933570, modb_s: 0.523178, modc_f: 0.602088, modc_s: 0.357802, tplpd_s: 1.077262 };
        if (val <= 345000.0) return { modb_f: 0.933570, modb_s: 0.523178, modc_f: 0.602088, modc_s: 0.361799, tplpd_s: 1.077262 };
        if (val <= 350000.0) return { modb_f: 0.933570, modb_s: 0.523178, modc_f: 0.602088, modc_s: 0.365797, tplpd_s: 1.077262 };
        if (val <= 354000.0) return { modb_f: 0.944697, modb_s: 0.523178, modc_f: 0.602088, modc_s: 0.365797, tplpd_s: 1.077262 };
        if (val <= 360000.0) return { modb_f: 0.944697, modb_s: 0.523178, modc_f: 0.602088, modc_s: 0.365797, tplpd_s: 1.077262 };
        if (val <= 361000.0) return { modb_f: 0.944697, modb_s: 0.523178, modc_f: 0.602088, modc_s: 0.365797, tplpd_s: 1.077262 };
        if (val <= 364000.0) return { modb_f: 0.946349, modb_s: 0.523178, modc_f: 0.600281, modc_s: 0.365797, tplpd_s: 1.077262 };
        if (val <= 367000.0) return { modb_f: 0.946349, modb_s: 0.523178, modc_f: 0.600281, modc_s: 0.365797, tplpd_s: 1.077262 };
        if (val <= 370000.0) return { modb_f: 0.946349, modb_s: 0.523178, modc_f: 0.598474, modc_s: 0.368938, tplpd_s: 1.077262 };
        if (val <= 376000.0) return { modb_f: 0.948001, modb_s: 0.523178, modc_f: 0.596667, modc_s: 0.372079, tplpd_s: 1.077262 };
        if (val <= 377000.0) return { modb_f: 0.948001, modb_s: 0.523178, modc_f: 0.596667, modc_s: 0.372079, tplpd_s: 1.077262 };
        if (val <= 380000.0) return { modb_f: 0.948001, modb_s: 0.523178, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.077262 };
        if (val <= 385000.0) return { modb_f: 0.948001, modb_s: 0.531439, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.077262 };
        if (val <= 387000.0) return { modb_f: 0.948001, modb_s: 0.531439, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.077262 };
        if (val <= 390000.0) return { modb_f: 0.948001, modb_s: 0.531439, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.077262 };
        if (val <= 394000.0) return { modb_f: 0.948001, modb_s: 0.531439, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.079447 };
        if (val <= 398000.0) return { modb_f: 0.949208, modb_s: 0.539699, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.079447 };
        if (val <= 400000.0) return { modb_f: 0.949208, modb_s: 0.539699, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.083137 };
        if (val <= 402000.0) return { modb_f: 0.949208, modb_s: 0.539699, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 403000.0) return { modb_f: 0.949208, modb_s: 0.539699, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 405000.0) return { modb_f: 0.949208, modb_s: 0.539699, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 408000.0) return { modb_f: 0.949208, modb_s: 0.539699, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 410000.0) return { modb_f: 0.949208, modb_s: 0.539699, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 411000.0) return { modb_f: 0.950414, modb_s: 0.547960, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 414500.0) return { modb_f: 0.950414, modb_s: 0.547960, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 417000.0) return { modb_f: 0.950414, modb_s: 0.547960, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 420000.0) return { modb_f: 0.950414, modb_s: 0.547960, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 424000.0) return { modb_f: 0.950414, modb_s: 0.547960, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 425000.0) return { modb_f: 0.951621, modb_s: 0.547960, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 427000.0) return { modb_f: 0.951621, modb_s: 0.547960, modc_f: 0.596667, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 429000.0) return { modb_f: 0.952114, modb_s: 0.548389, modc_f: 0.596053, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 434000.0) return { modb_f: 0.952114, modb_s: 0.548389, modc_f: 0.596053, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 435000.0) return { modb_f: 0.952114, modb_s: 0.548389, modc_f: 0.595440, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 440000.0) return { modb_f: 0.952114, modb_s: 0.548389, modc_f: 0.595440, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 443000.0) return { modb_f: 0.952607, modb_s: 0.548817, modc_f: 0.594826, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 447000.0) return { modb_f: 0.952607, modb_s: 0.548817, modc_f: 0.592347, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 450000.0) return { modb_f: 0.952607, modb_s: 0.548817, modc_f: 0.592347, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 453000.0) return { modb_f: 0.952607, modb_s: 0.548817, modc_f: 0.589867, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 458000.0) return { modb_f: 0.952607, modb_s: 0.548817, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 460000.0) return { modb_f: 0.952607, modb_s: 0.548817, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 464000.0) return { modb_f: 0.953101, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 470000.0) return { modb_f: 0.953101, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 474000.0) return { modb_f: 0.953101, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 477000.0) return { modb_f: 0.953101, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 480000.0) return { modb_f: 0.953101, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 484000.0) return { modb_f: 0.953101, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 488000.0) return { modb_f: 0.953101, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 490000.0) return { modb_f: 0.960985, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 497000.0) return { modb_f: 0.960985, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 500000.0) return { modb_f: 0.968869, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 501000.0) return { modb_f: 0.968869, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 503000.0) return { modb_f: 0.968869, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 505000.0) return { modb_f: 0.979896, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 508000.0) return { modb_f: 0.979896, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 509000.0) return { modb_f: 0.979896, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 510000.0) return { modb_f: 0.979896, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 512000.0) return { modb_f: 0.979896, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 513500.0) return { modb_f: 0.979896, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 520000.0) return { modb_f: 0.979896, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 521000.0) return { modb_f: 0.983039, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 524000.0) return { modb_f: 0.983039, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 525000.0) return { modb_f: 0.983039, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 526000.0) return { modb_f: 0.986181, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 528000.0) return { modb_f: 0.986181, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 530000.0) return { modb_f: 0.986181, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 531000.0) return { modb_f: 0.986181, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 533000.0) return { modb_f: 0.986181, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 535000.0) return { modb_f: 0.986181, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 537000.0) return { modb_f: 0.986181, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 540000.0) return { modb_f: 0.986181, modb_s: 0.549245, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 541000.0) return { modb_f: 0.986181, modb_s: 0.554233, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 545000.0) return { modb_f: 0.986181, modb_s: 0.554233, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 546000.0) return { modb_f: 0.986181, modb_s: 0.554233, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 550000.0) return { modb_f: 0.986181, modb_s: 0.554233, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 551000.0) return { modb_f: 0.986181, modb_s: 0.559221, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 552000.0) return { modb_f: 0.986181, modb_s: 0.559221, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 555000.0) return { modb_f: 0.986181, modb_s: 0.559221, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 557000.0) return { modb_f: 0.986181, modb_s: 0.559221, modc_f: 0.587388, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 558000.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.584895, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 560000.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.584895, modc_s: 0.375220, tplpd_s: 1.084179 };
        if (val <= 562000.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.582402, modc_s: 0.377888, tplpd_s: 1.084179 };
        if (val <= 563000.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.582402, modc_s: 0.377888, tplpd_s: 1.084179 };
        if (val <= 570000.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.576341, modc_s: 0.380556, tplpd_s: 1.084179 };
        if (val <= 577000.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.572774, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 577500.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.572774, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 580000.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.572774, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 585000.0) return { modb_f: 0.986181, modb_s: 0.564208, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 588000.0) return { modb_f: 0.986181, modb_s: 0.563725, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 590000.0) return { modb_f: 0.986181, modb_s: 0.563725, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 594000.0) return { modb_f: 0.986181, modb_s: 0.563725, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 598000.0) return { modb_f: 0.986181, modb_s: 0.563725, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 599000.0) return { modb_f: 0.986181, modb_s: 0.563241, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 600000.0) return { modb_f: 0.986181, modb_s: 0.563241, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 602000.0) return { modb_f: 0.986181, modb_s: 0.563241, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 605000.0) return { modb_f: 0.986181, modb_s: 0.563241, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 608000.0) return { modb_f: 0.986181, modb_s: 0.563241, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 610000.0) return { modb_f: 0.986181, modb_s: 0.563241, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 613000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 616000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.383224, tplpd_s: 1.084179 };
        if (val <= 619000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.384701, tplpd_s: 1.084179 };
        if (val <= 620000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.384701, tplpd_s: 1.084179 };
        if (val <= 625000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.386178, tplpd_s: 1.084179 };
        if (val <= 630000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.386178, tplpd_s: 1.084179 };
        if (val <= 632000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.387654, tplpd_s: 1.084179 };
        if (val <= 635000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.387654, tplpd_s: 1.084179 };
        if (val <= 642000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.387654, tplpd_s: 1.084179 };
        if (val <= 645000.0) return { modb_f: 0.986181, modb_s: 0.562757, modc_f: 0.569207, modc_s: 0.387654, tplpd_s: 1.084179 };
        if (val <= 649000.0) return { modb_f: 0.986181, modb_s: 0.563594, modc_f: 0.569207, modc_s: 0.388399, tplpd_s: 1.084179 };
        if (val <= 650000.0) return { modb_f: 0.986181, modb_s: 0.563594, modc_f: 0.569207, modc_s: 0.388399, tplpd_s: 1.084179 };
        if (val <= 652500.0) return { modb_f: 0.986181, modb_s: 0.563594, modc_f: 0.569207, modc_s: 0.388399, tplpd_s: 1.084179 };
        if (val <= 656000.0) return { modb_f: 0.986181, modb_s: 0.568440, modc_f: 0.569207, modc_s: 0.389144, tplpd_s: 1.084179 };
        if (val <= 660000.0) return { modb_f: 0.986181, modb_s: 0.568440, modc_f: 0.569207, modc_s: 0.389144, tplpd_s: 1.084179 };
        if (val <= 661000.0) return { modb_f: 0.986181, modb_s: 0.568440, modc_f: 0.569207, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 665000.0) return { modb_f: 0.986181, modb_s: 0.568440, modc_f: 0.569207, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 670000.0) return { modb_f: 0.986181, modb_s: 0.573285, modc_f: 0.565062, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 675000.0) return { modb_f: 0.986181, modb_s: 0.573285, modc_f: 0.565062, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 679000.0) return { modb_f: 0.986181, modb_s: 0.577293, modc_f: 0.560917, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 680000.0) return { modb_f: 0.986181, modb_s: 0.577293, modc_f: 0.560917, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 684000.0) return { modb_f: 0.986181, modb_s: 0.577293, modc_f: 0.556772, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 687000.0) return { modb_f: 0.986181, modb_s: 0.577293, modc_f: 0.556772, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 690000.0) return { modb_f: 0.986181, modb_s: 0.577293, modc_f: 0.556772, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 693000.0) return { modb_f: 0.986181, modb_s: 0.577854, modc_f: 0.556420, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 700000.0) return { modb_f: 0.986181, modb_s: 0.577854, modc_f: 0.556069, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 703000.0) return { modb_f: 0.986181, modb_s: 0.577854, modc_f: 0.556069, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 705000.0) return { modb_f: 0.986181, modb_s: 0.577854, modc_f: 0.556069, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 709000.0) return { modb_f: 0.990787, modb_s: 0.578416, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 710000.0) return { modb_f: 0.990787, modb_s: 0.578416, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 714000.0) return { modb_f: 0.990787, modb_s: 0.578416, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 715000.0) return { modb_f: 0.990787, modb_s: 0.578416, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 720000.0) return { modb_f: 0.990787, modb_s: 0.578416, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 721000.0) return { modb_f: 0.995394, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 729000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 730000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 732000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 735000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 740000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 744000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.084179 };
        if (val <= 750000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.389889, tplpd_s: 1.091578 };
        if (val <= 755000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.390608, tplpd_s: 1.091578 };
        if (val <= 760000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.390608, tplpd_s: 1.091578 };
        if (val <= 764000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.392073, tplpd_s: 1.091578 };
        if (val <= 765000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.392073, tplpd_s: 1.091578 };
        if (val <= 770000.0) return { modb_f: 1.000000, modb_s: 0.578977, modc_f: 0.555717, modc_s: 0.392073, tplpd_s: 1.091578 };
        if (val <= 772000.0) return { modb_f: 1.000000, modb_s: 0.579907, modc_f: 0.555717, modc_s: 0.393537, tplpd_s: 1.091578 };
        if (val <= 775000.0) return { modb_f: 1.000000, modb_s: 0.579907, modc_f: 0.555717, modc_s: 0.393537, tplpd_s: 1.091578 };
        if (val <= 778000.0) return { modb_f: 1.000000, modb_s: 0.579907, modc_f: 0.555717, modc_s: 0.393537, tplpd_s: 1.091578 };
        if (val <= 786000.0) return { modb_f: 1.000000, modb_s: 0.579907, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 788000.0) return { modb_f: 1.000000, modb_s: 0.580837, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 790000.0) return { modb_f: 1.000000, modb_s: 0.580837, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 795000.0) return { modb_f: 1.000000, modb_s: 0.580837, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 798000.0) return { modb_f: 1.000000, modb_s: 0.580837, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 799000.0) return { modb_f: 1.000000, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 800000.0) return { modb_f: 1.000000, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 803000.0) return { modb_f: 1.000000, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 815000.0) return { modb_f: 1.000000, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 816000.0) return { modb_f: 1.000000, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 820000.0) return { modb_f: 1.000000, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394282, tplpd_s: 1.091578 };
        if (val <= 823000.0) return { modb_f: 1.000000, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394297, tplpd_s: 1.091578 };
        if (val <= 830000.0) return { modb_f: 1.000000, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394297, tplpd_s: 1.091578 };
        if (val <= 840000.0) return { modb_f: 0.992502, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394312, tplpd_s: 1.091578 };
        if (val <= 842000.0) return { modb_f: 0.992502, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394312, tplpd_s: 1.091578 };
        if (val <= 845000.0) return { modb_f: 0.992502, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394312, tplpd_s: 1.091578 };
        if (val <= 849000.0) return { modb_f: 0.985003, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 850000.0) return { modb_f: 0.985003, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 855000.0) return { modb_f: 0.985003, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 859000.0) return { modb_f: 0.985003, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 860000.0) return { modb_f: 0.985003, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 865000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 870000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 875000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 876000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 880000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 890000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 895000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 899000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 900000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 905000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 908000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 910000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 915000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 920000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 927000.0) return { modb_f: 0.977505, modb_s: 0.581766, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 929000.0) return { modb_f: 0.977505, modb_s: 0.582468, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 931000.0) return { modb_f: 0.977505, modb_s: 0.582468, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 934000.0) return { modb_f: 0.977505, modb_s: 0.582468, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 938000.0) return { modb_f: 0.977505, modb_s: 0.582468, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 939000.0) return { modb_f: 0.977505, modb_s: 0.589209, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 940000.0) return { modb_f: 0.977505, modb_s: 0.589209, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 945000.0) return { modb_f: 0.977505, modb_s: 0.589209, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 950000.0) return { modb_f: 0.977505, modb_s: 0.589209, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 960000.0) return { modb_f: 0.977505, modb_s: 0.595950, modc_f: 0.555717, modc_s: 0.394327, tplpd_s: 1.091578 };
        if (val <= 965000.0) return { modb_f: 0.977505, modb_s: 0.595950, modc_f: 0.555717, modc_s: 0.396847, tplpd_s: 1.091578 };
        if (val <= 970000.0) return { modb_f: 0.977505, modb_s: 0.595950, modc_f: 0.555717, modc_s: 0.396847, tplpd_s: 1.091578 };
        if (val <= 976000.0) return { modb_f: 0.977505, modb_s: 0.595950, modc_f: 0.555717, modc_s: 0.399367, tplpd_s: 1.091578 };
        if (val <= 979000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.399367, tplpd_s: 1.091578 };
        if (val <= 980000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.399367, tplpd_s: 1.091578 };
        if (val <= 984000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 985000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 993000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 999000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1000000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1005000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1007000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1019000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1028000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1030000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1036000.0) return { modb_f: 0.977505, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1039000.0) return { modb_f: 0.965464, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1042000.0) return { modb_f: 0.965464, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1047000.0) return { modb_f: 0.965464, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1049000.0) return { modb_f: 0.953424, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1050000.0) return { modb_f: 0.953424, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1060000.0) return { modb_f: 0.953424, modb_s: 0.601990, modc_f: 0.555717, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1069000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.555030, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1070000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.555030, modc_s: 0.401887, tplpd_s: 1.091578 };
        if (val <= 1076000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.554343, modc_s: 0.403953, tplpd_s: 1.091578 };
        if (val <= 1080000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.554343, modc_s: 0.403953, tplpd_s: 1.091578 };
        if (val <= 1087000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.406019, tplpd_s: 1.091578 };
        if (val <= 1089000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.406019, tplpd_s: 1.091578 };
        if (val <= 1090000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.406019, tplpd_s: 1.091578 };
        if (val <= 1099000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.406019, tplpd_s: 1.091578 };
        if (val <= 1100000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.406019, tplpd_s: 1.091578 };
        if (val <= 1104000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1105000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1115000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1118000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1127000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1130000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1136000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1139000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1150000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1153000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1158000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1167000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1169000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1170000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1180000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1184000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1190000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1199000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1200000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1210000.0) return { modb_f: 0.941383, modb_s: 0.601990, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1219000.0) return { modb_f: 0.941383, modb_s: 0.613011, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1220000.0) return { modb_f: 0.941383, modb_s: 0.613011, modc_f: 0.553656, modc_s: 0.408085, tplpd_s: 1.091578 };
        if (val <= 1222000.0) return { modb_f: 0.941383, modb_s: 0.613011, modc_f: 0.553656, modc_s: 0.408253, tplpd_s: 1.091578 };
        if (val <= 1225000.0) return { modb_f: 0.941383, modb_s: 0.613011, modc_f: 0.553656, modc_s: 0.408253, tplpd_s: 1.091578 };
        if (val <= 1228000.0) return { modb_f: 0.941383, modb_s: 0.624033, modc_f: 0.553656, modc_s: 0.408253, tplpd_s: 1.091578 };
        if (val <= 1235000.0) return { modb_f: 0.941383, modb_s: 0.624033, modc_f: 0.553656, modc_s: 0.408421, tplpd_s: 1.091578 };
        if (val <= 1250000.0) return { modb_f: 0.941383, modb_s: 0.624033, modc_f: 0.553656, modc_s: 0.408421, tplpd_s: 1.091578 };
        if (val <= 1258000.0) return { modb_f: 0.941383, modb_s: 0.635054, modc_f: 0.553656, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1264000.0) return { modb_f: 0.941383, modb_s: 0.635054, modc_f: 0.553656, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1266000.0) return { modb_f: 0.941383, modb_s: 0.635054, modc_f: 0.553656, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1278000.0) return { modb_f: 0.941383, modb_s: 0.635054, modc_f: 0.553656, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1289000.0) return { modb_f: 0.941383, modb_s: 0.642900, modc_f: 0.553656, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1298000.0) return { modb_f: 0.941383, modb_s: 0.650745, modc_f: 0.553656, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1299000.0) return { modb_f: 0.941383, modb_s: 0.650745, modc_f: 0.544357, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1300000.0) return { modb_f: 0.941383, modb_s: 0.650745, modc_f: 0.544357, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1315000.0) return { modb_f: 0.941383, modb_s: 0.650745, modc_f: 0.535057, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1320000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1336000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1350000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1351000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1354000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1357000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1368000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1370000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1378000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1390000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1394000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1400000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1406000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.408588, tplpd_s: 1.091578 };
        if (val <= 1419000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.409781, tplpd_s: 1.091578 };
        if (val <= 1423000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.409781, tplpd_s: 1.091578 };
        if (val <= 1434000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.410973, tplpd_s: 1.091578 };
        if (val <= 1437000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.410973, tplpd_s: 1.091578 };
        if (val <= 1450000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1455000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1470000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1480000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1485000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1499000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1500000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1508000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1520000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1529000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1530000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1550000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.525758, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1553000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.521721, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1560000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.521721, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1572000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.517683, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1585000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.517683, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1600000.0) return { modb_f: 0.941383, modb_s: 0.658591, modc_f: 0.517683, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1602000.0) return { modb_f: 0.932280, modb_s: 0.675391, modc_f: 0.513645, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1610000.0) return { modb_f: 0.923177, modb_s: 0.692191, modc_f: 0.513645, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1627000.0) return { modb_f: 0.923177, modb_s: 0.692191, modc_f: 0.509313, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1640000.0) return { modb_f: 0.914074, modb_s: 0.709764, modc_f: 0.509313, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1654000.0) return { modb_f: 0.914074, modb_s: 0.710536, modc_f: 0.504982, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1670000.0) return { modb_f: 0.914074, modb_s: 0.711308, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1690000.0) return { modb_f: 0.914074, modb_s: 0.714829, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1700000.0) return { modb_f: 0.914074, modb_s: 0.714829, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1710000.0) return { modb_f: 0.914074, modb_s: 0.714829, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1713000.0) return { modb_f: 0.914074, modb_s: 0.718349, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1730000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1750000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1762000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1780000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1799000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1800000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1810000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1827000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1830000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1850000.0) return { modb_f: 0.914074, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1885000.0) return { modb_f: 0.913075, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412166, tplpd_s: 1.091578 };
        if (val <= 1900000.0) return { modb_f: 0.913075, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412183, tplpd_s: 1.091578 };
        if (val <= 1907000.0) return { modb_f: 0.910743, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412183, tplpd_s: 1.091578 };
        if (val <= 1929000.0) return { modb_f: 0.908410, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412183, tplpd_s: 1.091578 };
        if (val <= 1930000.0) return { modb_f: 0.908410, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412183, tplpd_s: 1.091578 };
        if (val <= 1946000.0) return { modb_f: 0.908410, modb_s: 0.721870, modc_f: 0.500650, modc_s: 0.412200, tplpd_s: 1.091578 };
        if (val <= 1950000.0) return { modb_f: 0.907077, modb_s: 0.721870, modc_f: 0.493495, modc_s: 0.413210, tplpd_s: 1.091578 };
        if (val <= 1965000.0) return { modb_f: 0.907077, modb_s: 0.721870, modc_f: 0.493495, modc_s: 0.413210, tplpd_s: 1.091578 };
        if (val <= 1980000.0) return { modb_f: 0.907077, modb_s: 0.721870, modc_f: 0.493495, modc_s: 0.413210, tplpd_s: 1.091578 };
        if (val <= 2000000.0) return { modb_f: 0.907077, modb_s: 0.721870, modc_f: 0.486339, modc_s: 0.414204, tplpd_s: 1.091578 };
        if (val <= 2010000.0) return { modb_f: 0.907077, modb_s: 0.724758, modc_f: 0.486339, modc_s: 0.414204, tplpd_s: 1.091578 };
        if (val <= 2015000.0) return { modb_f: 0.907077, modb_s: 0.724758, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2030000.0) return { modb_f: 0.907077, modb_s: 0.727646, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2050000.0) return { modb_f: 0.907077, modb_s: 0.730534, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2080000.0) return { modb_f: 0.907077, modb_s: 0.739411, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2090000.0) return { modb_f: 0.901949, modb_s: 0.749118, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2116000.0) return { modb_f: 0.901949, modb_s: 0.749118, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2120000.0) return { modb_f: 0.896821, modb_s: 0.765033, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2150000.0) return { modb_f: 0.891693, modb_s: 0.772071, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2180000.0) return { modb_f: 0.885827, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2200000.0) return { modb_f: 0.885827, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2210000.0) return { modb_f: 0.879960, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2218000.0) return { modb_f: 0.879960, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2220000.0) return { modb_f: 0.874094, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2244000.0) return { modb_f: 0.866168, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2290000.0) return { modb_f: 0.858242, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2300000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2337000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2340000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2350000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2360000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2380000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2400000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2405000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2450000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2470000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2500000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2533000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2550000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2570000.0) return { modb_f: 0.850316, modb_s: 0.778280, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2580000.0) return { modb_f: 0.846738, modb_s: 0.787862, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2600000.0) return { modb_f: 0.846738, modb_s: 0.787862, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2640000.0) return { modb_f: 0.843160, modb_s: 0.804340, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2650000.0) return { modb_f: 0.843160, modb_s: 0.804340, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2660000.0) return { modb_f: 0.839582, modb_s: 0.820818, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2680000.0) return { modb_f: 0.839582, modb_s: 0.820818, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2690000.0) return { modb_f: 0.839582, modb_s: 0.827714, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2720000.0) return { modb_f: 0.839582, modb_s: 0.827714, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2750000.0) return { modb_f: 0.829406, modb_s: 0.827714, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2790000.0) return { modb_f: 0.819231, modb_s: 0.827714, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2850000.0) return { modb_f: 0.809056, modb_s: 0.827714, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2860000.0) return { modb_f: 0.809056, modb_s: 0.827714, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2900000.0) return { modb_f: 0.809056, modb_s: 0.827714, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2920000.0) return { modb_f: 0.809056, modb_s: 0.832675, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2940000.0) return { modb_f: 0.809056, modb_s: 0.837635, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2970000.0) return { modb_f: 0.809056, modb_s: 0.842596, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 2990000.0) return { modb_f: 0.809056, modb_s: 0.842596, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3000000.0) return { modb_f: 0.809056, modb_s: 0.842596, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3040000.0) return { modb_f: 0.809056, modb_s: 0.845339, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3060000.0) return { modb_f: 0.809056, modb_s: 0.845339, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3090000.0) return { modb_f: 0.809056, modb_s: 0.848083, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3128000.0) return { modb_f: 0.809056, modb_s: 0.850826, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3170000.0) return { modb_f: 0.809056, modb_s: 0.850826, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3200000.0) return { modb_f: 0.809056, modb_s: 0.850826, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3272000.0) return { modb_f: 0.809056, modb_s: 0.850826, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3300000.0) return { modb_f: 0.809056, modb_s: 0.850826, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3320000.0) return { modb_f: 0.809056, modb_s: 0.867914, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3360000.0) return { modb_f: 0.809056, modb_s: 0.885001, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3390000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3400000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3450000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3500000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3510000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3580000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3600000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3670000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3690000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3730000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3800000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3850000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3920000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 3980000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4000000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4080000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4148000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4250000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4300000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4350000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4380000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4500000.0) return { modb_f: 0.809056, modb_s: 0.902089, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4570000.0) return { modb_f: 0.791710, modb_s: 0.929616, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4640000.0) return { modb_f: 0.774365, modb_s: 0.957144, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4700000.0) return { modb_f: 0.757019, modb_s: 0.984671, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4800000.0) return { modb_f: 0.757019, modb_s: 0.989781, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4880000.0) return { modb_f: 0.757019, modb_s: 0.994890, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 4980000.0) return { modb_f: 0.757019, modb_s: 0.994890, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5000000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5066000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5180000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5270000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5321000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5380000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5520000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5600000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5800000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5850000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5880000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 5980000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6110000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6200000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6330000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6399000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6500000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6502000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6620000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6780000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6850000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6916600.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 6980000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 7040000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 7200000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 7410000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 7500000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 7532000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 7660000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 7800000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 7930000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 8100000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 8220000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 8420000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 8650000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 8900000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 9130000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 9370000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 9410000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 9500000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 9562000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 9769000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 9900000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 10145000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 10529000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 10652000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 10815000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 11250000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 11590000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 11701000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 12372000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 12480000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 12804800.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 13530000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 13800000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 14421000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 15035000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 15200000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 16000000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 16715000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 17368000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 18505000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 19035000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 20800000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 22200000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 24000000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 25380000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        if (val <= 26600000.0) return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
        return { modb_f: 0.757019, modb_s: 1.000000, modc_f: 0.479183, modc_s: 0.415197, tplpd_s: 1.091578 };
    },
    per_body_amt: function(val) {
        if (val <= 0.0) return { modc_f: 0.951676 };
        if (val <= 275000.0) return { modc_f: 0.951676 };
        if (val <= 365000.0) return { modc_f: 0.951676 };
        if (val <= 399000.0) return { modc_f: 0.951676 };
        if (val <= 459000.0) return { modc_f: 0.951676 };
        if (val <= 492000.0) return { modc_f: 0.951676 };
        if (val <= 499000.0) return { modc_f: 0.951676 };
        if (val <= 519000.0) return { modc_f: 0.951676 };
        if (val <= 529000.0) return { modc_f: 0.951676 };
        if (val <= 539000.0) return { modc_f: 0.951676 };
        if (val <= 549000.0) return { modc_f: 0.951676 };
        if (val <= 559000.0) return { modc_f: 0.951676 };
        if (val <= 569000.0) return { modc_f: 0.951676 };
        if (val <= 579000.0) return { modc_f: 0.951676 };
        if (val <= 589000.0) return { modc_f: 0.951676 };
        if (val <= 599000.0) return { modc_f: 0.951676 };
        if (val <= 609000.0) return { modc_f: 0.951676 };
        if (val <= 619000.0) return { modc_f: 0.951676 };
        if (val <= 629000.0) return { modc_f: 0.951676 };
        if (val <= 639000.0) return { modc_f: 0.951676 };
        if (val <= 649000.0) return { modc_f: 0.951676 };
        if (val <= 659000.0) return { modc_f: 0.967784 };
        if (val <= 669000.0) return { modc_f: 0.983892 };
        if (val <= 679000.0) return { modc_f: 1.000000 };
        if (val <= 689000.0) return { modc_f: 1.000000 };
        if (val <= 699000.0) return { modc_f: 1.000000 };
        if (val <= 709000.0) return { modc_f: 1.000000 };
        if (val <= 719000.0) return { modc_f: 1.000000 };
        if (val <= 729000.0) return { modc_f: 1.000000 };
        if (val <= 739000.0) return { modc_f: 1.000000 };
        if (val <= 749000.0) return { modc_f: 1.000000 };
        if (val <= 759000.0) return { modc_f: 1.000000 };
        if (val <= 769000.0) return { modc_f: 1.000000 };
        if (val <= 779000.0) return { modc_f: 1.000000 };
        if (val <= 789000.0) return { modc_f: 1.000000 };
        if (val <= 799000.0) return { modc_f: 1.000000 };
        if (val <= 809000.0) return { modc_f: 1.000000 };
        if (val <= 819000.0) return { modc_f: 1.000000 };
        if (val <= 829000.0) return { modc_f: 1.000000 };
        if (val <= 839000.0) return { modc_f: 1.000000 };
        if (val <= 849000.0) return { modc_f: 1.000000 };
        if (val <= 859000.0) return { modc_f: 1.000000 };
        if (val <= 869000.0) return { modc_f: 1.000000 };
        if (val <= 879000.0) return { modc_f: 1.000000 };
        if (val <= 889000.0) return { modc_f: 1.000000 };
        if (val <= 899000.0) return { modc_f: 1.000000 };
        if (val <= 909000.0) return { modc_f: 1.000000 };
        if (val <= 919000.0) return { modc_f: 1.000000 };
        if (val <= 929000.0) return { modc_f: 1.000000 };
        if (val <= 939000.0) return { modc_f: 1.000000 };
        if (val <= 949000.0) return { modc_f: 1.000000 };
        if (val <= 959000.0) return { modc_f: 1.001802 };
        if (val <= 969000.0) return { modc_f: 1.003605 };
        if (val <= 979000.0) return { modc_f: 1.005407 };
        if (val <= 989000.0) return { modc_f: 1.005407 };
        if (val <= 999000.0) return { modc_f: 1.005407 };
        if (val <= 1009000.0) return { modc_f: 1.005407 };
        if (val <= 1019000.0) return { modc_f: 1.005407 };
        if (val <= 1030000.0) return { modc_f: 1.007018 };
        if (val <= 1039000.0) return { modc_f: 1.008628 };
        if (val <= 1050000.0) return { modc_f: 1.010238 };
        if (val <= 1069000.0) return { modc_f: 1.010238 };
        if (val <= 1080000.0) return { modc_f: 1.010238 };
        if (val <= 1099000.0) return { modc_f: 1.010238 };
        if (val <= 1109000.0) return { modc_f: 1.010238 };
        if (val <= 1119000.0) return { modc_f: 1.010238 };
        if (val <= 1130000.0) return { modc_f: 1.010238 };
        if (val <= 1138000.0) return { modc_f: 1.010238 };
        if (val <= 1158000.0) return { modc_f: 1.010238 };
        if (val <= 1169000.0) return { modc_f: 1.010238 };
        if (val <= 1178000.0) return { modc_f: 1.015221 };
        if (val <= 1198000.0) return { modc_f: 1.020204 };
        if (val <= 1228000.0) return { modc_f: 1.025187 };
        if (val <= 1238000.0) return { modc_f: 1.027011 };
        if (val <= 1250000.0) return { modc_f: 1.028834 };
        if (val <= 1268000.0) return { modc_f: 1.030657 };
        if (val <= 1280000.0) return { modc_f: 1.031768 };
        if (val <= 1299000.0) return { modc_f: 1.032880 };
        if (val <= 1328000.0) return { modc_f: 1.034507 };
        if (val <= 1350000.0) return { modc_f: 1.035024 };
        if (val <= 1360000.0) return { modc_f: 1.051254 };
        if (val <= 1390000.0) return { modc_f: 1.066967 };
        if (val <= 1399000.0) return { modc_f: 1.082679 };
        if (val <= 1420000.0) return { modc_f: 1.082679 };
        if (val <= 1440000.0) return { modc_f: 1.082679 };
        if (val <= 1450000.0) return { modc_f: 1.082679 };
        if (val <= 1458000.0) return { modc_f: 1.082679 };
        if (val <= 1490000.0) return { modc_f: 1.082679 };
        if (val <= 1500000.0) return { modc_f: 1.082679 };
        if (val <= 1510000.0) return { modc_f: 1.082679 };
        if (val <= 1520000.0) return { modc_f: 1.082679 };
        if (val <= 1560000.0) return { modc_f: 1.082679 };
        if (val <= 1570000.0) return { modc_f: 1.082679 };
        if (val <= 1590000.0) return { modc_f: 1.082679 };
        if (val <= 1610000.0) return { modc_f: 1.082679 };
        if (val <= 1630000.0) return { modc_f: 1.082679 };
        if (val <= 1650000.0) return { modc_f: 1.082679 };
        if (val <= 1670000.0) return { modc_f: 1.082679 };
        if (val <= 1680000.0) return { modc_f: 1.082679 };
        if (val <= 1690000.0) return { modc_f: 1.082679 };
        if (val <= 1700000.0) return { modc_f: 1.082679 };
        if (val <= 1720000.0) return { modc_f: 1.082679 };
        if (val <= 1730000.0) return { modc_f: 1.082679 };
        if (val <= 1750000.0) return { modc_f: 1.082679 };
        if (val <= 1780000.0) return { modc_f: 1.082679 };
        if (val <= 1790000.0) return { modc_f: 1.082679 };
        if (val <= 1810000.0) return { modc_f: 1.082679 };
        if (val <= 1830000.0) return { modc_f: 1.082679 };
        if (val <= 1850000.0) return { modc_f: 1.082679 };
        if (val <= 1860000.0) return { modc_f: 1.082679 };
        if (val <= 1880000.0) return { modc_f: 1.082679 };
        if (val <= 1900000.0) return { modc_f: 1.082679 };
        if (val <= 1930000.0) return { modc_f: 1.082679 };
        if (val <= 1950000.0) return { modc_f: 1.082679 };
        if (val <= 1960000.0) return { modc_f: 1.082679 };
        if (val <= 1980000.0) return { modc_f: 1.082679 };
        if (val <= 1990000.0) return { modc_f: 1.082679 };
        if (val <= 2010000.0) return { modc_f: 1.082679 };
        if (val <= 2020000.0) return { modc_f: 1.082679 };
        if (val <= 2050000.0) return { modc_f: 1.082679 };
        if (val <= 2070000.0) return { modc_f: 1.082679 };
        if (val <= 2090000.0) return { modc_f: 1.082679 };
        if (val <= 2100000.0) return { modc_f: 1.082679 };
        if (val <= 2130000.0) return { modc_f: 1.082679 };
        if (val <= 2150000.0) return { modc_f: 1.082679 };
        if (val <= 2170000.0) return { modc_f: 1.082679 };
        if (val <= 2190000.0) return { modc_f: 1.082679 };
        if (val <= 2210000.0) return { modc_f: 1.082679 };
        if (val <= 2240000.0) return { modc_f: 1.082679 };
        if (val <= 2250000.0) return { modc_f: 1.082679 };
        if (val <= 2270000.0) return { modc_f: 1.082679 };
        if (val <= 2290000.0) return { modc_f: 1.082679 };
        if (val <= 2310000.0) return { modc_f: 1.082679 };
        if (val <= 2330000.0) return { modc_f: 1.082679 };
        if (val <= 2350000.0) return { modc_f: 1.082679 };
        if (val <= 2370000.0) return { modc_f: 1.082679 };
        if (val <= 2390000.0) return { modc_f: 1.082679 };
        if (val <= 2410000.0) return { modc_f: 1.082679 };
        if (val <= 2440000.0) return { modc_f: 1.082679 };
        if (val <= 2450000.0) return { modc_f: 1.082679 };
        if (val <= 2490000.0) return { modc_f: 1.082679 };
        if (val <= 2510000.0) return { modc_f: 1.082679 };
        if (val <= 2540000.0) return { modc_f: 1.082679 };
        if (val <= 2560000.0) return { modc_f: 1.082679 };
        if (val <= 2580000.0) return { modc_f: 1.082679 };
        if (val <= 2610000.0) return { modc_f: 1.082679 };
        if (val <= 2620000.0) return { modc_f: 1.082679 };
        if (val <= 2650000.0) return { modc_f: 1.082679 };
        if (val <= 2680000.0) return { modc_f: 1.082679 };
        if (val <= 2700000.0) return { modc_f: 1.082679 };
        if (val <= 2723000.0) return { modc_f: 1.082679 };
        if (val <= 2750000.0) return { modc_f: 1.082679 };
        if (val <= 2760000.0) return { modc_f: 1.082679 };
        if (val <= 2790000.0) return { modc_f: 1.082679 };
        if (val <= 2820000.0) return { modc_f: 1.082679 };
        if (val <= 2850000.0) return { modc_f: 1.082679 };
        if (val <= 2880000.0) return { modc_f: 1.082679 };
        if (val <= 2890000.0) return { modc_f: 1.082679 };
        if (val <= 2920000.0) return { modc_f: 1.082679 };
        if (val <= 2930000.0) return { modc_f: 1.082679 };
        if (val <= 2980000.0) return { modc_f: 1.082679 };
        if (val <= 2990000.0) return { modc_f: 1.082679 };
        if (val <= 3040000.0) return { modc_f: 1.082679 };
        if (val <= 3050000.0) return { modc_f: 1.082679 };
        if (val <= 3090000.0) return { modc_f: 1.082679 };
        if (val <= 3110000.0) return { modc_f: 1.082679 };
        if (val <= 3170000.0) return { modc_f: 1.082679 };
        if (val <= 3200000.0) return { modc_f: 1.082679 };
        if (val <= 3220000.0) return { modc_f: 1.082679 };
        if (val <= 3250000.0) return { modc_f: 1.082679 };
        if (val <= 3270000.0) return { modc_f: 1.082679 };
        if (val <= 3290000.0) return { modc_f: 1.082679 };
        if (val <= 3330000.0) return { modc_f: 1.082679 };
        if (val <= 3370000.0) return { modc_f: 1.082679 };
        if (val <= 3380000.0) return { modc_f: 1.082679 };
        if (val <= 3430000.0) return { modc_f: 1.082679 };
        if (val <= 3460000.0) return { modc_f: 1.082679 };
        if (val <= 3500000.0) return { modc_f: 1.082679 };
        if (val <= 3550000.0) return { modc_f: 1.082679 };
        if (val <= 3580000.0) return { modc_f: 1.082679 };
        if (val <= 3590000.0) return { modc_f: 1.082679 };
        if (val <= 3630000.0) return { modc_f: 1.082679 };
        if (val <= 3650000.0) return { modc_f: 1.082679 };
        if (val <= 3680000.0) return { modc_f: 1.082679 };
        if (val <= 3730000.0) return { modc_f: 1.082679 };
        if (val <= 3770000.0) return { modc_f: 1.082679 };
        if (val <= 3800000.0) return { modc_f: 1.082679 };
        if (val <= 3850000.0) return { modc_f: 1.082679 };
        if (val <= 3880000.0) return { modc_f: 1.082679 };
        if (val <= 3950000.0) return { modc_f: 1.082679 };
        if (val <= 3980000.0) return { modc_f: 1.082679 };
        if (val <= 4080000.0) return { modc_f: 1.082679 };
        if (val <= 4110000.0) return { modc_f: 1.082679 };
        if (val <= 4190000.0) return { modc_f: 1.082679 };
        if (val <= 4210000.0) return { modc_f: 1.082679 };
        if (val <= 4280000.0) return { modc_f: 1.082679 };
        if (val <= 4330000.0) return { modc_f: 1.082679 };
        if (val <= 4380000.0) return { modc_f: 1.082679 };
        if (val <= 4500000.0) return { modc_f: 1.082679 };
        if (val <= 4560000.0) return { modc_f: 1.082679 };
        if (val <= 4600000.0) return { modc_f: 1.082679 };
        if (val <= 4650000.0) return { modc_f: 1.082679 };
        if (val <= 4700000.0) return { modc_f: 1.082679 };
        if (val <= 4750000.0) return { modc_f: 1.082679 };
        if (val <= 4830000.0) return { modc_f: 1.082679 };
        if (val <= 4900000.0) return { modc_f: 1.082679 };
        if (val <= 4950000.0) return { modc_f: 1.082679 };
        if (val <= 4990000.0) return { modc_f: 1.082679 };
        if (val <= 5030000.0) return { modc_f: 1.082679 };
        if (val <= 5050000.0) return { modc_f: 1.082679 };
        if (val <= 5120000.0) return { modc_f: 1.082679 };
        if (val <= 5190000.0) return { modc_f: 1.082679 };
        if (val <= 5250000.0) return { modc_f: 1.082679 };
        if (val <= 5310000.0) return { modc_f: 1.082679 };
        if (val <= 5390000.0) return { modc_f: 1.082679 };
        if (val <= 5460000.0) return { modc_f: 1.082679 };
        if (val <= 5560000.0) return { modc_f: 1.082679 };
        if (val <= 5640000.0) return { modc_f: 1.082679 };
        if (val <= 5760000.0) return { modc_f: 1.082679 };
        if (val <= 5800000.0) return { modc_f: 1.082679 };
        if (val <= 5830000.0) return { modc_f: 1.082679 };
        if (val <= 5880000.0) return { modc_f: 1.082679 };
        if (val <= 6000000.0) return { modc_f: 1.082679 };
        if (val <= 6110000.0) return { modc_f: 1.082679 };
        if (val <= 6200000.0) return { modc_f: 1.082679 };
        if (val <= 6410000.0) return { modc_f: 1.082679 };
        if (val <= 6530000.0) return { modc_f: 1.082679 };
        if (val <= 6600000.0) return { modc_f: 1.082679 };
        if (val <= 6720000.0) return { modc_f: 1.082679 };
        if (val <= 6780000.0) return { modc_f: 1.082679 };
        if (val <= 6930000.0) return { modc_f: 1.082679 };
        if (val <= 6980000.0) return { modc_f: 1.082679 };
        if (val <= 7150000.0) return { modc_f: 1.082679 };
        if (val <= 7200000.0) return { modc_f: 1.082679 };
        if (val <= 7280000.0) return { modc_f: 1.082679 };
        if (val <= 7420000.0) return { modc_f: 1.082679 };
        if (val <= 7580000.0) return { modc_f: 1.082679 };
        if (val <= 7640000.0) return { modc_f: 1.082679 };
        if (val <= 7750000.0) return { modc_f: 1.082679 };
        if (val <= 7772000.0) return { modc_f: 1.082679 };
        if (val <= 7950000.0) return { modc_f: 1.082679 };
        if (val <= 8180000.0) return { modc_f: 1.082679 };
        if (val <= 8520000.0) return { modc_f: 1.082679 };
        if (val <= 8660000.0) return { modc_f: 1.082679 };
        if (val <= 9170000.0) return { modc_f: 1.082679 };
        if (val <= 9410000.0) return { modc_f: 1.082679 };
        if (val <= 9950000.0) return { modc_f: 1.082679 };
        if (val <= 10680000.0) return { modc_f: 1.082679 };
        if (val <= 11270000.0) return { modc_f: 1.082679 };
        if (val <= 11690000.0) return { modc_f: 1.082679 };
        if (val <= 12000000.0) return { modc_f: 1.082679 };
        if (val <= 12580000.0) return { modc_f: 1.082679 };
        if (val <= 13750000.0) return { modc_f: 1.082679 };
        if (val <= 16000000.0) return { modc_f: 1.082679 };
        if (val <= 20980000.0) return { modc_f: 1.082679 };
        return { modc_f: 1.082679 };
    },
    per_death_amt: function(val) {
        if (val <= 0.0) return { tplbi_s: 1.069094 };
        if (val <= 300000.0) return { tplbi_s: 0.769864 };
        if (val <= 310000.0) return { tplbi_s: 0.945914 };
        if (val <= 320000.0) return { tplbi_s: 0.945914 };
        if (val <= 350000.0) return { tplbi_s: 0.945914 };
        if (val <= 390000.0) return { tplbi_s: 0.945914 };
        if (val <= 400000.0) return { tplbi_s: 0.945914 };
        if (val <= 430000.0) return { tplbi_s: 0.945914 };
        if (val <= 450000.0) return { tplbi_s: 0.945914 };
        if (val <= 500000.0) return { tplbi_s: 0.945914 };
        if (val <= 550000.0) return { tplbi_s: 0.945914 };
        if (val <= 560000.0) return { tplbi_s: 0.945914 };
        if (val <= 580000.0) return { tplbi_s: 0.945914 };
        if (val <= 590000.0) return { tplbi_s: 0.945914 };
        if (val <= 600000.0) return { tplbi_s: 0.945914 };
        if (val <= 650000.0) return { tplbi_s: 0.945914 };
        if (val <= 690000.0) return { tplbi_s: 0.945914 };
        if (val <= 700000.0) return { tplbi_s: 0.945914 };
        if (val <= 750000.0) return { tplbi_s: 0.945914 };
        if (val <= 800000.0) return { tplbi_s: 0.945914 };
        if (val <= 850000.0) return { tplbi_s: 0.945914 };
        if (val <= 900000.0) return { tplbi_s: 0.945914 };
        if (val <= 950000.0) return { tplbi_s: 0.945914 };
        if (val <= 1000000.0) return { tplbi_s: 0.945914 };
        if (val <= 1020000.0) return { tplbi_s: 0.982533 };
        if (val <= 1030000.0) return { tplbi_s: 0.982533 };
        if (val <= 1050000.0) return { tplbi_s: 0.982533 };
        if (val <= 1086000.0) return { tplbi_s: 0.982533 };
        if (val <= 1100000.0) return { tplbi_s: 0.982533 };
        if (val <= 1150000.0) return { tplbi_s: 0.982533 };
        if (val <= 1200000.0) return { tplbi_s: 0.982533 };
        if (val <= 1210000.0) return { tplbi_s: 0.982533 };
        if (val <= 1220000.0) return { tplbi_s: 0.982533 };
        if (val <= 1250000.0) return { tplbi_s: 0.982533 };
        if (val <= 1285000.0) return { tplbi_s: 0.982533 };
        if (val <= 1300000.0) return { tplbi_s: 0.982533 };
        if (val <= 1350000.0) return { tplbi_s: 0.982533 };
        if (val <= 1370000.0) return { tplbi_s: 0.982533 };
        if (val <= 1400000.0) return { tplbi_s: 0.982533 };
        if (val <= 1450000.0) return { tplbi_s: 0.982533 };
        if (val <= 1480000.0) return { tplbi_s: 0.982533 };
        if (val <= 1500000.0) return { tplbi_s: 0.982533 };
        if (val <= 1550000.0) return { tplbi_s: 0.982533 };
        if (val <= 1600000.0) return { tplbi_s: 0.982533 };
        if (val <= 1650000.0) return { tplbi_s: 0.982533 };
        if (val <= 1700000.0) return { tplbi_s: 0.982533 };
        if (val <= 1750000.0) return { tplbi_s: 1.000000 };
        if (val <= 1800000.0) return { tplbi_s: 1.000000 };
        if (val <= 1820000.0) return { tplbi_s: 1.000000 };
        if (val <= 1850000.0) return { tplbi_s: 1.000000 };
        if (val <= 1900000.0) return { tplbi_s: 1.000000 };
        if (val <= 1950000.0) return { tplbi_s: 1.000000 };
        if (val <= 2000000.0) return { tplbi_s: 1.000000 };
        if (val <= 2100000.0) return { tplbi_s: 1.000000 };
        if (val <= 2200000.0) return { tplbi_s: 1.000000 };
        if (val <= 2300000.0) return { tplbi_s: 1.000000 };
        if (val <= 2400000.0) return { tplbi_s: 1.000000 };
        if (val <= 2500000.0) return { tplbi_s: 1.046802 };
        if (val <= 2510000.0) return { tplbi_s: 1.046802 };
        if (val <= 2600000.0) return { tplbi_s: 1.046802 };
        if (val <= 2700000.0) return { tplbi_s: 1.046802 };
        if (val <= 2750000.0) return { tplbi_s: 1.046802 };
        if (val <= 2800000.0) return { tplbi_s: 1.046802 };
        if (val <= 2850000.0) return { tplbi_s: 1.046802 };
        if (val <= 2900000.0) return { tplbi_s: 1.046802 };
        if (val <= 3000000.0) return { tplbi_s: 1.046802 };
        if (val <= 3070000.0) return { tplbi_s: 1.046802 };
        if (val <= 3100000.0) return { tplbi_s: 1.046802 };
        if (val <= 3200000.0) return { tplbi_s: 1.046802 };
        if (val <= 3300000.0) return { tplbi_s: 1.046802 };
        if (val <= 3395000.0) return { tplbi_s: 1.046802 };
        if (val <= 3400000.0) return { tplbi_s: 1.046802 };
        if (val <= 3500000.0) return { tplbi_s: 1.063121 };
        if (val <= 3600000.0) return { tplbi_s: 1.063121 };
        if (val <= 3640000.0) return { tplbi_s: 1.063121 };
        if (val <= 3700000.0) return { tplbi_s: 1.063121 };
        if (val <= 3800000.0) return { tplbi_s: 1.063121 };
        if (val <= 3900000.0) return { tplbi_s: 1.063121 };
        if (val <= 4000000.0) return { tplbi_s: 1.063121 };
        if (val <= 4100000.0) return { tplbi_s: 1.063121 };
        if (val <= 4200000.0) return { tplbi_s: 1.063121 };
        if (val <= 4500000.0) return { tplbi_s: 1.063121 };
        if (val <= 4600000.0) return { tplbi_s: 1.063121 };
        if (val <= 4900000.0) return { tplbi_s: 1.063121 };
        if (val <= 5000000.0) return { tplbi_s: 1.069094 };
        if (val <= 5060000.0) return { tplbi_s: 1.069094 };
        if (val <= 5100000.0) return { tplbi_s: 1.069094 };
        if (val <= 5500000.0) return { tplbi_s: 1.069094 };
        if (val <= 6000000.0) return { tplbi_s: 1.069094 };
        if (val <= 6500000.0) return { tplbi_s: 1.069094 };
        if (val <= 6600000.0) return { tplbi_s: 1.069094 };
        if (val <= 6800000.0) return { tplbi_s: 1.069094 };
        if (val <= 7000000.0) return { tplbi_s: 1.069094 };
        if (val <= 7100000.0) return { tplbi_s: 1.069094 };
        if (val <= 7500000.0) return { tplbi_s: 1.069094 };
        if (val <= 8000000.0) return { tplbi_s: 1.069094 };
        if (val <= 8500000.0) return { tplbi_s: 1.069094 };
        if (val <= 9000000.0) return { tplbi_s: 1.069094 };
        if (val <= 9500000.0) return { tplbi_s: 1.069094 };
        if (val <= 10000000.0) return { tplbi_s: 1.069094 };
        if (val <= 12000000.0) return { tplbi_s: 1.069094 };
        if (val <= 15000000.0) return { tplbi_s: 1.069094 };
        if (val <= 18500000.0) return { tplbi_s: 1.069094 };
        if (val <= 20000000.0) return { tplbi_s: 1.069094 };
        if (val <= 30000000.0) return { tplbi_s: 1.069094 };
        return { tplbi_s: 1.069094 };
    },
};

// ============ 3. 建立運算 API ============
app.post('/api/calculate', (req, res) => {
    try {
        const body = req.body;

        // 智能處理 25 個輸入參數
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

        // 應用查表與函數
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

        // === ⬇️ 從這裡開始替換：核心指標精算與輸出 ===

        // 1. 計算預估件均損失頻率 (Predicted Frequency)
        const freq_B = BASE.MODB.freqBase * freqCoef.modb;
        const freq_C = BASE.MODC.freqBase * freqCoef.modc;
        const freq_PD = BASE.TPLPD.freqBase * freqCoef.tplpd;
        const freq_BI = BASE.TPLBI.freqBase * freqCoef.tplbi;

        // 2. 計算調整後件均損失金額 (Adjusted Severity = Base * Coef * Excess)
        const sev_B = BASE.MODB.sevBase * sevCoef.modb * BASE.MODB.excessLoading;
        const sev_C = BASE.MODC.sevBase * sevCoef.modc * BASE.MODC.excessLoading;
        const sev_PD = BASE.TPLPD.sevBase * sevCoef.tplpd * BASE.TPLPD.excessLoading;
        const sev_BI = BASE.TPLBI.sevBase * sevCoef.tplbi * BASE.TPLBI.excessLoading;

        // 3. 計算模型風險保費 (Predicted Risk Premium)
        const prem_B = freq_B * sev_B;
        const prem_C = freq_C * sev_C;
        const prem_PD = freq_PD * sev_PD;
        const prem_BI = freq_BI * sev_BI;

        // 4. 計算預期損失率 (Implied Loss Ratio)
        // 這裡新增支援從前端(或Power Automate)傳入 "actual_mod_b" 等實際簽單保費
        // 若無傳入實際保費，則使用目標損率(0.65)與折扣來模擬合理簽單保費
        const target_lr = 0.65;
        let discount = (inputs.sales_channel === "23.富昇保代") ? 0.90 : 1.0;
        
        const actual_B = parseFloat(body.actual_mod_b) || ((prem_B / target_lr) * discount);
        const actual_C = parseFloat(body.actual_mod_c) || ((prem_C / target_lr) * discount);
        const actual_PD = parseFloat(body.actual_tpl_pd) || ((prem_PD / target_lr) * discount);
        const actual_BI = parseFloat(body.actual_tpl_bi) || ((prem_BI / target_lr) * discount);

        // 5. 輸出完整 4 項指標 JSON
        res.status(200).json({
            success: true,
            
            // 車體乙式 (MODB)
            modB_premium: Math.round(prem_B),
            modB_freq: freq_B.toFixed(4),
            modB_sev: Math.round(sev_B),
            modB_lr: ((prem_B / actual_B) * 100).toFixed(1) + "%",

            // 車體丙式 (MODC)
            modC_premium: Math.round(prem_C),
            modC_freq: freq_C.toFixed(4),
            modC_sev: Math.round(sev_C),
            modC_lr: ((prem_C / actual_C) * 100).toFixed(1) + "%",

            // 第三人財損 (TPLPD)
            tplPd_premium: Math.round(prem_PD),
            tplPd_freq: freq_PD.toFixed(4),
            tplPd_sev: Math.round(sev_PD),
            tplPd_lr: ((prem_PD / actual_PD) * 100).toFixed(1) + "%",

            // 第三人體傷 (TPLBI)
            tplBi_premium: Math.round(prem_BI),
            tplBi_freq: freq_BI.toFixed(4),
            tplBi_sev: Math.round(sev_BI),
            tplBi_lr: ((prem_BI / actual_BI) * 100).toFixed(1) + "%",
            
            message: "25 因子模型運算成功：四項核心精算指標匯出完成"
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Full GLM Engine API is running on port " + PORT);
});
