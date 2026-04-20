import express from 'express';

const app = express();
app.use(express.json());

// ============ 1. 完整帶入 HTML 裡的 BASE 與 COEF ============
const BASE = {
    MODB: { freqBase: 0.201886068352, sevBase: 76643.3351101606, excessLoading: 1.0 },
    MODC: { freqBase: 0.144189270833, sevBase: 135809.94549238, excessLoading: 1.0 },
    TPLPD: { freqBase: 0.0501408880492, sevBase: 38430.3140679646, excessLoading: 1.0 },
    TPLBI: { freqBase: 0.0196627190383, sevBase: 76850.3825114719, excessLoading: 1.028015 }
};

const COEF = {
    applicant_rela: {
        "本人_Myself": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "配偶_Spouse": { modb_f: 0.9385, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "父母_Parents": { modb_f: 1.0072, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "子女_Child": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "兄弟姐妹_Siblings": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "僱傭_Empolyment": { modb_f: 1.0396, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "其他_Others": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 }
    },
    insured_age: function(age) {
        if (age <= 20) return { modb_f: 1.5545, modb_s: 1.1893, modc_f: 1.0, modc_s: 1.0317, tplpd_f: 2.0668, tplpd_s: 1.077, tplbi_f: 1.9856, tplbi_s: 1.0 };
        if (age <= 25) return { modb_f: 1.1633, modb_s: 1.1893, modc_f: 1.0, modc_s: 1.0317, tplpd_f: 1.319, tplpd_s: 1.0564, tplbi_f: 1.1853, tplbi_s: 1.0 };
        if (age <= 30) return { modb_f: 1.0053, modb_s: 1.0749, modc_f: 1.0, modc_s: 1.0108, tplpd_f: 1.0242, tplpd_s: 1.0564, tplbi_f: 1.0318, tplbi_s: 1.0 };
        if (age <= 35) return { modb_f: 0.9634, modb_s: 1.0056, modc_f: 1.0, modc_s: 1.0002, tplpd_f: 0.8953, tplpd_s: 1.0112, tplbi_f: 0.9254, tplbi_s: 1.0 };
        if (age <= 45) return { modb_f: 0.9343, modb_s: 0.9871, modc_f: 1.0, modc_s: 0.9425, tplpd_f: 0.8415, tplpd_s: 1.005, tplbi_f: 0.8861, tplbi_s: 1.0 };
        if (age <= 55) return { modb_f: 0.9343, modb_s: 0.9871, modc_f: 1.0, modc_s: 0.9425, tplpd_f: 0.8415, tplpd_s: 0.9946, tplbi_f: 0.8871, tplbi_s: 1.0 };
        if (age <= 65) return { modb_f: 0.998, modb_s: 0.9733, modc_f: 1.0, modc_s: 0.9425, tplpd_f: 0.8415, tplpd_s: 0.9796, tplbi_f: 0.8871, tplbi_s: 1.0 };
        return { modb_f: 1.0503, modb_s: 0.9705, modc_f: 1.0, modc_s: 0.9425, tplpd_f: 0.8415, tplpd_s: 0.9796, tplbi_f: 0.8871, tplbi_s: 1.0 };
    },
    insured_sex: {
        "女性_Female": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "男性_Male": { modb_f: 1.0105, modb_s: 1.0471, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0251, tplbi_f: 1.0, tplbi_s: 1.0 },
        "法人_CompanyUse": { modb_f: 1.0105, modb_s: 1.0029, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0251, tplbi_f: 1.0, tplbi_s: 1.0 }
    },
    sex_age: function(val) {
        if (val.startsWith('F')) return { modc_f: 1.0447 };
        return { modc_f: 1.0 };
    },
    zip_code: function(zip) {
        if (zip >= 100 && zip <= 116) return { modb_f: 1.03, modb_s: 0.94, modc_f: 1.0, modc_s: 0.94, tplpd_f: 1.18, tplpd_s: 1.03, tplbi_f: 0.82, tplbi_s: 0.97 };
        if (zip >= 200 && zip <= 260) return { modb_f: 1.1, modb_s: 0.95, modc_f: 1.03, modc_s: 0.97, tplpd_f: 1.18, tplpd_s: 1.01, tplbi_f: 0.85, tplbi_s: 0.94 };
        if (zip >= 300 && zip <= 369) return { modb_f: 1.03, modb_s: 1.0056, modc_f: 1.1177, modc_s: 0.9683, tplpd_f: 1.1296, tplpd_s: 0.9713, tplbi_f: 1.0008, tplbi_s: 0.8307 };
        if (zip >= 400 && zip <= 439) return { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 };
        return { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 };
    },
    make_desc: {
        "BMW(德國)": { modb_f: 1.047, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.8952, tplpd_s: 1.073, tplbi_f: 0.8787, tplbi_s: 1.0 },
        "Benz賓士": { modb_f: 0.9465, modb_s: 1.0, modc_f: 0.8447, modc_s: 1.0, tplpd_f: 0.8763, tplpd_s: 1.0443, tplbi_f: 0.886, tplbi_s: 1.0 },
        "Audi奧迪(德國)": { modb_f: 0.9993, modb_s: 1.0, modc_f: 0.9873, modc_s: 1.0, tplpd_f: 0.9372, tplpd_s: 1.0243, tplbi_f: 0.9008, tplbi_s: 1.0 },
        "Toyota豐田": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.9052, tplpd_s: 1.0184, tplbi_f: 0.8847, tplbi_s: 1.0 },
        "Honda本田": { modb_f: 0.8346, modb_s: 1.0, modc_f: 0.9313, modc_s: 1.0, tplpd_f: 0.8921, tplpd_s: 0.9994, tplbi_f: 0.8849, tplbi_s: 1.0 },
        "Mazda馬自達": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.9052, tplpd_s: 1.0184, tplbi_f: 0.8847, tplbi_s: 1.0 },
        "Nissan日產": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.9052, tplpd_s: 1.0184, tplbi_f: 0.8847, tplbi_s: 1.0 },
        "Ford福特": { modb_f: 0.8976, modb_s: 1.0, modc_f: 0.8805, modc_s: 1.0, tplpd_f: 0.9707, tplpd_s: 1.0374, tplbi_f: 0.9081, tplbi_s: 1.0 },
        "Hyundai現代": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.9573, tplpd_s: 1.0184, tplbi_f: 0.946, tplbi_s: 1.0 },
        "Kia起亞": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.842, modc_s: 1.0, tplpd_f: 0.9166, tplpd_s: 1.0184, tplbi_f: 0.9104, tplbi_s: 1.0 },
        "Lexus凌志": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.9052, tplpd_s: 1.0184, tplbi_f: 0.8847, tplbi_s: 1.0 },
        "Porsche保時捷": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.9052, tplpd_s: 1.0184, tplbi_f: 0.8847, tplbi_s: 1.0 },
        "Volvo富豪": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.9052, tplpd_s: 1.0184, tplbi_f: 0.8847, tplbi_s: 1.0 },
        "國瑞(國產)": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0, tplpd_f: 0.9052, tplpd_s: 1.0184, tplbi_f: 0.8847, tplbi_s: 1.0 },
        "缺失值": { modb_f: 0.9011, modb_s: 1.0, modc_f: 0.8824, modc_s: 1.0311, tplpd_f: 0.9013, tplpd_s: 1.0311, tplbi_f: 0.8836, tplbi_s: 1.0 }
    },
    motor_type: {
        "自用小客車_PPA": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "客貨兩用車_BiUse": { modb_f: 1.0, modb_s: 1.0, modc_f: 0.858, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0337, tplbi_f: 0.8802, tplbi_s: 1.0 },
        "自用小貨車": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "公司自小貨": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 }
    },
    veh_age: function(age) {
        if (age <= 0) return { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 0.9974, tplpd_f: 0.739, tplpd_s: 0.9235, tplbi_f: 0.856, tplbi_s: 1.0 };
        if (age <= 2) return { modb_f: 1.0, modb_s: 1.1041, modc_f: 1.0, modc_s: 1.0, tplpd_f: 0.7978, tplpd_s: 0.9602, tplbi_f: 0.8615, tplbi_s: 1.0 };
        if (age <= 5) return { modb_f: 1.0, modb_s: 1.1893, modc_f: 1.0, modc_s: 0.9916, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 };
        if (age <= 8) return { modb_f: 0.9831, modb_s: 1.1940, modc_f: 0.992, modc_s: 0.9499, tplpd_f: 1.0411, tplpd_s: 0.9998, tplbi_f: 1.0301, tplbi_s: 1.0 };
        if (age <= 12) return { modb_f: 0.8514, modb_s: 1.0959, modc_f: 0.9098, modc_s: 0.7657, tplpd_f: 1.011, tplpd_s: 0.9728, tplbi_f: 0.9678, tplbi_s: 1.0 };
        return { modb_f: 0.8118, modb_s: 0.8176, modc_f: 0.7356, modc_s: 0.5533, tplpd_f: 0.9536, tplpd_s: 0.9584, tplbi_f: 0.852, tplbi_s: 1.0 };
    },
    displacement: function(cc) {
        if (cc <= 1500) return { tplpd_s: 0.9823, tplbi_s: 0.9705 };
        if (cc <= 2000) return { tplpd_s: 1.0057, tplbi_s: 1.0 };
        if (cc <= 3000) return { tplpd_s: 1.0936, tplbi_s: 1.0705 };
        return { tplpd_s: 1.15, tplbi_s: 1.12 };
    },
    motor_coef: {
        "-0.6": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 0.9922, tplpd_s: 1.0, tplbi_f: 0.9639, tplbi_s: 1.0 },
        "-0.4": { modb_f: 1.3657, modb_s: 1.0, modc_f: 1.1727, modc_s: 1.0, tplpd_f: 1.0616, tplpd_s: 1.0, tplbi_f: 1.0618, tplbi_s: 1.0 },
        "-0.3": { modb_f: 1.1833, modb_s: 1.0, modc_f: 1.1833, modc_s: 1.0, tplpd_f: 1.0464, tplpd_s: 1.0, tplbi_f: 1.0062, tplbi_s: 1.0 },
        "-0.2": { modb_f: 1.5842, modb_s: 1.0, modc_f: 1.1833, modc_s: 1.0, tplpd_f: 1.0464, tplpd_s: 1.0, tplbi_f: 1.0062, tplbi_s: 1.0 },
        "0": { modb_f: 1.8245, modb_s: 1.0, modc_f: 1.2818, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "0.2": { modb_f: 2.3427, modb_s: 1.0, modc_f: 1.5951, modc_s: 1.0, tplpd_f: 1.3595, tplpd_s: 1.0, tplbi_f: 1.4166, tplbi_s: 1.0 },
        "0.4": { modb_f: 2.6224, modb_s: 1.0, modc_f: 1.7219, modc_s: 1.0, tplpd_f: 1.5418, tplpd_s: 1.0, tplbi_f: 1.4166, tplbi_s: 1.0 },
        "0.6": { modb_f: 2.936, modb_s: 1.0, modc_f: 2.0486, modc_s: 1.0, tplpd_f: 1.7995, tplpd_s: 1.0, tplbi_f: 1.4166, tplbi_s: 1.0 },
        "0.8": { modb_f: 3.528, modb_s: 1.0, modc_f: 2.0486, modc_s: 1.0, tplpd_f: 1.7995, tplpd_s: 1.0, tplbi_f: 1.4166, tplbi_s: 1.0 },
        "1": { modb_f: 3.7475, modb_s: 1.0, modc_f: 2.4188, modc_s: 1.0, tplpd_f: 1.7995, tplpd_s: 1.0, tplbi_f: 1.4166, tplbi_s: 1.0 }
    },
    passages: {
        "2": { modb_f: 0.7046, modb_s: 1.8836, modc_f: 1.0, modc_s: 1.0, tplpd_f: 0.8835, tplpd_s: 1.0, tplbi_f: 0.9271, tplbi_s: 1.0 },
        "3": { modb_f: 0.9089, modb_s: 1.177, modc_f: 1.0, modc_s: 1.0, tplpd_f: 0.8847, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "4": { modb_f: 0.9089, modb_s: 1.177, modc_f: 1.0, modc_s: 1.0, tplpd_f: 0.9916, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "5": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "6": { modb_f: 0.9811, modb_s: 0.8747, modc_f: 0.8488, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "7": { modb_f: 0.9811, modb_s: 0.8747, modc_f: 0.8488, modc_s: 1.0, tplpd_f: 0.8975, tplpd_s: 1.0, tplbi_f: 0.8638, tplbi_s: 1.0 },
        "8": { modb_f: 0.9146, modb_s: 0.8708, modc_f: 0.7069, modc_s: 1.0, tplpd_f: 0.8493, tplpd_s: 1.0, tplbi_f: 0.8638, tplbi_s: 1.0 }
    },
    rprice: function(price) {
        let factor = Math.log(price / 1000000) * 0.3 + 1;
        return { modc_s: factor, tplbi_f: 0.986 + (price - 1000000) / 50000000, tplbi_s: 0.9404 };
    },
    com_ru1: function(code) {
        if (code <= 10) return { modb_s: 0.7541 };
        if (code <= 20) return { modb_s: 1.0 };
        if (code <= 30) return { modb_s: 1.89 };
        return { modb_s: 2.595 };
    },
    tft_ru1: function(code) {
        if (code <= 14) return { modc_s: 1.0 };
        return { modc_s: 1.0816 };
    },
    sales_channel: {
        "03.集團跨售_人壽": { modb_f: 0.9035, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "23.富昇保代": { modb_f: 0.8312, modb_s: 1.0, modc_f: 0.9576, modc_s: 1.0158, tplpd_f: 0.9517, tplpd_s: 1.0115, tplbi_f: 0.9466, tplbi_s: 1.0 },
        "04.富邦保代": { modb_f: 0.8284, modb_s: 1.0, modc_f: 1.0039, modc_s: 1.0263, tplpd_f: 1.0844, tplpd_s: 1.0092, tplbi_f: 0.9214, tplbi_s: 1.0 },
        "07.壽險保經代": { modb_f: 0.8544, modb_s: 1.0, modc_f: 0.9921, modc_s: 1.0158, tplpd_f: 0.9927, tplpd_s: 1.0211, tplbi_f: 1.0188, tplbi_s: 1.0 },
        "09.一般經代": { modb_f: 0.867, modb_s: 1.0, modc_f: 0.9971, modc_s: 1.0158, tplpd_f: 0.9865, tplpd_s: 1.0236, tplbi_f: 0.9468, tplbi_s: 1.0 },
        "18.客戶自行投保_官網": { modb_f: 0.7746, modb_s: 1.0, modc_f: 0.9904, modc_s: 1.0158, tplpd_f: 0.8271, tplpd_s: 0.9798, tplbi_f: 0.8334, tplbi_s: 1.0 },
        "02.員工招攬(直接業務)": { modb_f: 0.8393, modb_s: 1.0, modc_f: 0.9644, modc_s: 1.0295, tplpd_f: 0.9866, tplpd_s: 1.0193, tplbi_f: 0.9975, tplbi_s: 1.0 },
        "19.其它通路": { modb_f: 0.9089, modb_s: 1.0, modc_f: 0.9576, modc_s: 1.0554, tplpd_f: 0.9938, tplpd_s: 1.016, tplbi_f: 0.998, tplbi_s: 1.0 }
    },
    resp_rank: {
        "0": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "1": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "2": { modb_f: 1.0, modb_s: 1.0128, modc_f: 1.1159, modc_s: 1.0, tplpd_f: 1.3066, tplpd_s: 1.0338, tplbi_f: 1.2091, tplbi_s: 1.0 },
        "3": { modb_f: 1.0, modb_s: 1.0128, modc_f: 1.1954, modc_s: 1.0, tplpd_f: 1.4064, tplpd_s: 1.0354, tplbi_f: 1.3505, tplbi_s: 1.0 },
        "4": { modb_f: 1.0, modb_s: 1.0304, modc_f: 1.2637, modc_s: 1.0263, tplpd_f: 1.5707, tplpd_s: 1.0463, tplbi_f: 1.5098, tplbi_s: 1.0 },
        "5": { modb_f: 1.0, modb_s: 1.0452, modc_f: 1.558, modc_s: 1.0615, tplpd_f: 1.8505, tplpd_s: 1.0463, tplbi_f: 1.8404, tplbi_s: 1.0 },
        "6": { modb_f: 1.0, modb_s: 1.1742, modc_f: 1.6156, modc_s: 1.0637, tplpd_f: 2.0655, tplpd_s: 1.0497, tplbi_f: 2.0155, tplbi_s: 1.0 },
        "7": { modb_f: 1.0, modb_s: 1.1862, modc_f: 1.7201, modc_s: 1.0637, tplpd_f: 2.3532, tplpd_s: 1.0497, tplbi_f: 2.2165, tplbi_s: 1.0 },
        "8": { modb_f: 1.0, modb_s: 1.1905, modc_f: 1.8145, modc_s: 1.0877, tplpd_f: 2.4, tplpd_s: 1.0648, tplbi_f: 2.2165, tplbi_s: 1.0 },
        "9": { modb_f: 1.0, modb_s: 1.289, modc_f: 1.9929, modc_s: 1.0931, tplpd_f: 2.7997, tplpd_s: 1.0813, tplbi_f: 2.7927, tplbi_s: 1.0 },
        "10": { modb_f: 1.0, modb_s: 1.289, modc_f: 1.9929, modc_s: 1.0931, tplpd_f: 2.995, tplpd_s: 1.0813, tplbi_f: 2.8106, tplbi_s: 1.0 }
    },
    pol_cy: {
        "2019": { modb_f: 0.8341, modb_s: 0.9253, modc_f: 0.968, modc_s: 0.8529, tplpd_f: 0.8563, tplpd_s: 0.9109, tplbi_f: 0.892, tplbi_s: 1.1903 },
        "2020": { modb_f: 1.1998, modb_s: 0.8075, modc_f: 0.9992, modc_s: 0.8529, tplpd_f: 0.9941, tplpd_s: 0.882, tplbi_f: 0.9719, tplbi_s: 1.1175 },
        "2021": { modb_f: 1.0188, modb_s: 0.8554, modc_f: 0.8691, modc_s: 0.9082, tplpd_f: 0.8388, tplpd_s: 0.9295, tplbi_f: 0.8613, tplbi_s: 1.1708 },
        "2022": { modb_f: 1.0422, modb_s: 0.9424, modc_f: 0.9669, modc_s: 0.9637, tplpd_f: 0.9045, tplpd_s: 1.0068, tplbi_f: 0.899, tplbi_s: 1.1708 },
        "2023": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 }
    },
    renew_flag: {
        "Y": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "N": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0839, tplpd_s: 1.0137, tplbi_f: 1.0, tplbi_s: 1.0 }
    },
    sec_eip: {
        "Y": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.045, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "N": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 }
    },
    tdir_flag: {
        "N": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "Y": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 0.9494 }
    },
    exliab_flag: {
        "Y": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "N": { modb_f: 1.0, modb_s: 0.9314, modc_f: 0.9371, modc_s: 1.0, tplpd_f: 0.8751, tplpd_s: 1.0, tplbi_f: 0.9098, tplbi_s: 1.0 }
    },
    excess_amt: {
        "0": { modb_f: 1.0, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "8000": { modb_f: 0.7715, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "10000": { modb_f: 0.5439, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "15000": { modb_f: 0.4644, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 },
        "20000": { modb_f: 0.414, modb_s: 1.0, modc_f: 1.0, modc_s: 1.0, tplpd_f: 1.0, tplpd_s: 1.0, tplbi_f: 1.0, tplbi_s: 1.0 }
    },
    total_insured: function(amt) {
        let base = 300000;
        let ratio = amt / base;
        return { 
            modb_f: 0.9862 + (ratio - 1) * 0.01, 
            modb_s: 0.5637 + (ratio - 1) * 0.1,
            modc_f: 0.5692 + (ratio - 1) * 0.1,
            modc_s: 0.3832 + (ratio - 1) * 0.1,
            tplpd_s: 1.0842
        };
    },
    per_body_amt: function(amt) {
        if (amt <= 659000) return { modc_f: 0.9517 };
        if (amt <= 959000) return { modc_f: 1.0 };
        if (amt <= 1399000) return { modc_f: 1.0827 };
        if (amt <= 2100000) return { modc_f: 1.0827 };
        return { modc_f: 1.1 };
    },
    per_death_amt: function(amt) {
        if (amt <= 2000000) return { tplbi_s: 1.0 };
        if (amt <= 3000000) return { tplbi_s: 1.0468 };
        return { tplbi_s: 1.1 };
    }
};

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
