import { version } from "../package.json";

export const API_BASE_URL = "https://api.appcockpit.dev";

export const CLIENT_VERSION = version;

export enum LanguageKey {
  EN = "en",
  ES = "es",
  FR = "fr",
  DE = "de",
  IT = "it",
  PT = "pt",
  RU = "ru",
  JA = "ja",
  KO = "ko",
  ZH = "zh",
  AR = "ar",
  HI = "hi",
  NL = "nl",
  SV = "sv",
  DA = "da",
  NO = "no",
  FI = "fi",
  PL = "pl",
  TR = "tr",
  HE = "he",
}

export const LOCALIZED_STRINGS: Record<
  LanguageKey,
  {
    updateRequired: string;
    updateAvailable: string;
    updateNow: string;
    later: string;
    forceUpdateDescription: string;
    updateDescription: string;
  }
> = {
  [LanguageKey.EN]: {
    updateRequired: "Update Required",
    updateAvailable: "Update Available",
    updateNow: "Update Now",
    later: "Later",
    forceUpdateDescription:
      "A critical update is required. Please update to continue using the app.",
    updateDescription:
      "An update is available. Please update to get the latest features and improvements.",
  },
  [LanguageKey.ES]: {
    updateRequired: "Actualización Requerida",
    updateAvailable: "Actualización Disponible",
    updateNow: "Actualizar Ahora",
    later: "Más Tarde",
    forceUpdateDescription:
      "Se requiere una actualización crítica. Actualice para continuar usando la aplicación.",
    updateDescription:
      "Hay una actualización disponible. Actualice ahora para obtener las últimas funciones y mejoras.",
  },
  [LanguageKey.FR]: {
    updateRequired: "Mise à Jour Requise",
    updateAvailable: "Mise à Jour Disponible",
    updateNow: "Mettre à Jour",
    later: "Plus Tard",
    forceUpdateDescription:
      "Une mise à jour critique est requise. Veuillez mettre à jour pour continuer à utiliser l'application.",
    updateDescription:
      "Une mise à jour est disponible. Mettez à jour maintenant pour obtenir les dernières fonctionnalités et améliorations.",
  },
  [LanguageKey.DE]: {
    updateRequired: "Update Erforderlich",
    updateAvailable: "Update Verfügbar",
    updateNow: "Jetzt Aktualisieren",
    later: "Später",
    forceUpdateDescription:
      "Ein kritisches Update ist erforderlich. Bitte aktualisieren Sie, um die App weiterhin nutzen zu können.",
    updateDescription:
      "Ein Update ist verfügbar. Aktualisieren Sie jetzt, um die neuesten Funktionen und Verbesserungen zu erhalten.",
  },
  [LanguageKey.IT]: {
    updateRequired: "Aggiornamento Richiesto",
    updateAvailable: "Aggiornamento Disponibile",
    updateNow: "Aggiorna Ora",
    later: "Più Tardi",
    forceUpdateDescription:
      "È richiesto un aggiornamento critico. Aggiorna per continuare a utilizzare l'app.",
    updateDescription:
      "È disponibile un aggiornamento. Aggiorna ora per ottenere le ultime funzionalità e miglioramenti.",
  },
  [LanguageKey.PT]: {
    updateRequired: "Atualização Necessária",
    updateAvailable: "Atualização Disponível",
    updateNow: "Atualizar Agora",
    later: "Mais Tarde",
    forceUpdateDescription:
      "Uma atualização crítica é necessária. Atualize para continuar usando o aplicativo.",
    updateDescription:
      "Uma atualização está disponível. Atualize agora para obter os recursos e melhorias mais recentes.",
  },
  [LanguageKey.RU]: {
    updateRequired: "Требуется Обновление",
    updateAvailable: "Доступно Обновление",
    updateNow: "Обновить Сейчас",
    later: "Позже",
    forceUpdateDescription:
      "Требуется критическое обновление. Пожалуйста, обновите приложение, чтобы продолжить его использование.",
    updateDescription:
      "Доступно обновление. Обновите сейчас, чтобы получить последние функции и улучшения.",
  },
  [LanguageKey.JA]: {
    updateRequired: "更新が必要です",
    updateAvailable: "更新が利用可能です",
    updateNow: "今すぐ更新",
    later: "後で",
    forceUpdateDescription:
      "重要な更新が必要です。アプリを引き続き使用するには更新してください。",
    updateDescription:
      "アップデートが利用可能です。最新の機能と改善を取得するには今すぐ更新してください。",
  },
  [LanguageKey.KO]: {
    updateRequired: "업데이트 필요",
    updateAvailable: "업데이트 가능",
    updateNow: "지금 업데이트",
    later: "나중에",
    forceUpdateDescription:
      "중요한 업데이트가 필요합니다. 앱을 계속 사용하려면 업데이트하세요.",
    updateDescription:
      "업데이트를 사용할 수 있습니다. 최신 기능과 개선 사항을 받으려면 지금 업데이트하세요.",
  },
  [LanguageKey.ZH]: {
    updateRequired: "需要更新",
    updateAvailable: "可用更新",
    updateNow: "立即更新",
    later: "稍后",
    forceUpdateDescription: "需要进行关键更新。请更新以继续使用该应用程序。",
    updateDescription: "有可用更新。立即更新以获取最新功能和改进。",
  },
  [LanguageKey.AR]: {
    updateRequired: "التحديث مطلوب",
    updateAvailable: "التحديث متاح",
    updateNow: "التحديث الآن",
    later: "لاحقاً",
    forceUpdateDescription:
      "مطلوب تحديث حرج. يرجى التحديث لمواصلة استخدام التطبيق.",
    updateDescription:
      "يتوفر تحديث. قم بالتحديث الآن للحصول على أحدث الميزات والتحسينات.",
  },
  [LanguageKey.HI]: {
    updateRequired: "अपडेट आवश्यक है",
    updateAvailable: "अपडेट उपलब्ध है",
    updateNow: "अभी अपडेट करें",
    later: "बाद में",
    forceUpdateDescription:
      "एक महत्वपूर्ण अपडेट आवश्यक है। ऐप का उपयोग जारी रखने के लिए कृपया अपडेट करें।",
    updateDescription:
      "एक अपडेट उपलब्ध है। नवीनतम सुविधाएँ और सुधार प्राप्त करने के लिए अभी अपडेट करें।",
  },
  [LanguageKey.NL]: {
    updateRequired: "Update Vereist",
    updateAvailable: "Update Beschikbaar",
    updateNow: "Nu Updaten",
    later: "Later",
    forceUpdateDescription:
      "Een kritieke update is vereist. Update om de app te blijven gebruiken.",
    updateDescription:
      "Er is een update beschikbaar. Update nu om de nieuwste functies en verbeteringen te krijgen.",
  },
  [LanguageKey.SV]: {
    updateRequired: "Uppdatering Krävs",
    updateAvailable: "Uppdatering Tillgänglig",
    updateNow: "Uppdatera Nu",
    later: "Senare",
    forceUpdateDescription:
      "En kritisk uppdatering krävs. Vänligen uppdatera för att fortsätta använda appen.",
    updateDescription:
      "En uppdatering finns tillgänglig. Uppdatera nu för att få de senaste funktionerna och förbättringarna.",
  },
  [LanguageKey.DA]: {
    updateRequired: "Opdatering Påkrævet",
    updateAvailable: "Opdatering Tilgængelig",
    updateNow: "Opdater Nu",
    later: "Senere",
    forceUpdateDescription:
      "En kritisk opdatering er påkrævet. Opdater venligst for at fortsætte med at bruge appen.",
    updateDescription:
      "En opdatering er tilgængelig. Opdater nu for at få de nyeste funktioner og forbedringer.",
  },
  [LanguageKey.NO]: {
    updateRequired: "Oppdatering Påkrevd",
    updateAvailable: "Oppdatering Tilgjengelig",
    updateNow: "Oppdater Nå",
    later: "Senere",
    forceUpdateDescription:
      "En kritisk oppdatering er påkrevd. Vennligst oppdater for å fortsette å bruke appen.",
    updateDescription:
      "En oppdatering er tilgjengelig. Oppdater nå for å få de nyeste funksjonene og forbedringene.",
  },
  [LanguageKey.FI]: {
    updateRequired: "Päivitys Vaaditaan",
    updateAvailable: "Päivitys Saatavilla",
    updateNow: "Päivitä Nyt",
    later: "Myöhemmin",
    forceUpdateDescription:
      "Kriittinen päivitys vaaditaan. Päivitä jatkaaksesi sovelluksen käyttöä.",
    updateDescription:
      "Päivitys on saatavilla. Päivitä nyt saadaksesi uusimmat ominaisuudet ja parannukset.",
  },
  [LanguageKey.PL]: {
    updateRequired: "Wymagana Aktualizacja",
    updateAvailable: "Dostępna Aktualizacja",
    updateNow: "Aktualizuj Teraz",
    later: "Później",
    forceUpdateDescription:
      "Wymagana jest krytyczna aktualizacja. Zaktualizuj, aby kontynuować korzystanie z aplikacji.",
    updateDescription:
      "Dostępna jest aktualizacja. Zaktualizuj teraz, aby uzyskać najnowsze funkcje i ulepszenia.",
  },
  [LanguageKey.TR]: {
    updateRequired: "Güncelleme Gerekli",
    updateAvailable: "Güncelleme Mevcut",
    updateNow: "Şimdi Güncelle",
    later: "Daha Sonra",
    forceUpdateDescription:
      "Kritik bir güncelleme gerekli. Uygulamayı kullanmaya devam etmek için lütfen güncelleyin.",
    updateDescription:
      "Bir güncelleme mevcut. En son özellikleri ve iyileştirmeleri almak için şimdi güncelleyin.",
  },
  [LanguageKey.HE]: {
    updateRequired: "נדרש עדכון",
    updateAvailable: "עדכון זמין",
    updateNow: "עדכן עכשיו",
    later: "מאוחר יותר",
    forceUpdateDescription:
      "נדרש עדכון קריטי. אנא עדכן כדי להמשיך להשתמש באפליקציה.",
    updateDescription:
      "עדכון זמין. עדכן כעת כדי לקבל את התכונות והשיפורים האחרונים.",
  },
};
