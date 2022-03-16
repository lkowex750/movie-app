import i18n from "i18next";
import { useContext } from "react";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      favorite: "favorites",
      movies: "movies",
      tvshows: "Tv series",
      search: "Search",
      sort: "Sort",
      sortBy: "Sort Results By",
      filters: "Filters",
      adultContents: "Adult Contents",
      viewDetail: "view details",
      fav_button: "favorite",
      unfav_button: "unfavorite",
      cast: "Cast",
      fullCast: "Full Cast & Crew",
      review: "Review",
      lang: "Lang",
      region: "Region",
      yourFav: "Your Favorites",
      search_button: "search",
      fav_empty: "You don't have Movies Favorites",
      cast_props: "Cast",
      crew_props: "Crew",
      not_fond: "Oops...! 404 Page Not Found",
      clear_button: "Clear",
      yes_button: "Yes",
      no_button: "No",
      dialog_clear_title: "You want to clear favorites movie?",
      dialog_clear_content: "You want to clear favorites movie?.....",
      date_filters : "Date Filters",
      date_from : "from",
      date_to : "to"
    },
  },
  th: {
    translation: {
      favorite: "รายการโปรด",
      movies: "หนังโรง",
      tvshows: "ซีรี่ย์",
      search: "ค้นหา",
      sort: "การเรียงลำดับ",
      sortBy: "จัดเรียงผลลัพธ์โดย",
      filters: "ตัวกรองประเภทหนัง",
      adultContents: "เนื้อหาสำหรับผู้ใหญ่",
      viewDetail: "ดูรายละเอียด",
      fav_button: "เพิ่มลงในรายการโปรด",
      unfav_button: "ยกเลิกรายการโปรด",
      cast: "รายชื่อนักแสดง",
      fullCast: "นักแสดงและทีมงานเต็มรูปแบบ",
      review: "วิจารณ์",
      lang: "ภาษา",
      region: "ภูมิภาค",
      yourFav: "รายการโปรดของคุณ",
      search_button: "เริ่มค้นหา",
      fav_empty: "คุณไม่มีรายการภาพยนตร์โปรด",
      cast_props: "นักแสดงหลัก",
      crew_props: "ทีมงาน",
      not_fond: "อุ๊ย...! รหัส 404 ไม่พบหน้า",
      clear_button: "เคลียร์",
      yes_button: "ใช่",
      no_button: "ไม่",
      dialog_clear_title: "คุณต้องการเคลียร์รายการโปรดหรือไม่?",
      dialog_clear_content: "คุณต้องการเคลียร์รายการโปรดหรือไม่?.....",
      date_filters : "ตัวกรองวันที่",
      date_from : "จากวันที่",
      date_to : "ถึงวันที่"
    },
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources,
});
