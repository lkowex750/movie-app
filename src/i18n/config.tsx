import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';


export const resources = {
    en : {
        translation : {
            "favorite" : "favorites",
            "movies": "movies",
            "tvshows" : "Tv series",
            "search": "Search",
            "sort": "Sort",
            "sortBy": "Sort Results By",
            "filters": "Filters",
            "adultContents" : "Adult Contents",
            "viewDetail" : "view details",
            "fav_button": "favorite",
            "unfav_button": "unfavorite",
            "cast": "Cast",
            "fullCast" : "Full Cast & Crew",
            "review": "Review",
            "lang": "Lang",
            "region": "Region",
            "yourFav": "Your Favorites",
            "search_button": "search"
        }
    },
    th : {
        translation : {
            "favorite" : "รายการโปรด",
            "movies": "หนังโรง",
            "tvshows" : "ซีรี่ย์",
            "search": "ค้นหา",
            "sort": "เรียงลำดับ",
            "sortBy" : "จัดเรียงผลลัพธ์โดย",
            "filters": "กรองประเภท",
            "adultContents" : "เนื้อหาสำหรับผู้ใหญ่",
            "viewDetail" : "ดูรายละเอียด",
            "fav_button": "ชื่นชอบ",
            "unfav_button": "เลิกชื่นชอบ",
            "cast": "รายชื่อนักแสดง",
            "fullCast" : "นักแสดงและทีมงานเต็มรูปแบบ",
            "review": "วิจารณ์",
            "lang": "ภาษา",
            "region": "ภูมิภาค",
            "yourFav": "รายการโปรดของคุณ",
            "search_button": "เริ่มค้นหา"
        }
    }

} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    interpolation: {
        escapeValue : false,
    },
    resources,
});