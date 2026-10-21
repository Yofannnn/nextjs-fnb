export const homeImages = {
  hero: {
    portrait: process.env.NEXT_PUBLIC_HOME_HERO_PORTRAIT_IMAGE_URL!,
    landscape: process.env.NEXT_PUBLIC_HOME_HERO_LANDSCAPE_IMAGE_URL!,
  },
  about: process.env.NEXT_PUBLIC_HOME_ABOUT_IMAGE_URL!,
  footer: process.env.NEXT_PUBLIC_HOME_FOOTER_IMAGE_URL!,
  discovery: {
    aboutus: process.env.NEXT_PUBLIC_HOME_BENTO_ABOUTUS_IMAGE_URL!,
    menu: process.env.NEXT_PUBLIC_HOME_BENTO_MENU_IMAGE_URL!,
    reviews: process.env.NEXT_PUBLIC_HOME_BENTO_REVIEWS_IMAGE_URL!,
    reservation: process.env.NEXT_PUBLIC_HOME_BENTO_RESERVATION_IMAGE_URL!,
  },
  services: {
    opening: process.env.NEXT_PUBLIC_HOME_SERVICE_OPENING_HOURS_URL!,
    takeaway: process.env.NEXT_PUBLIC_HOME_SERVICE_TAKEAWAY_URL!,
    delivery: process.env.NEXT_PUBLIC_HOME_SERVICE_DELIVERY_URL!,
  },
} as const;
