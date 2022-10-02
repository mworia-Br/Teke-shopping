export const configs = {};

configs.title = "TekeFresh";
configs.description = "Buy Online from Teke | All payment options available";

configs.aboutus =
  "TekeFresh is a quick delivery e-commerce application with multiple Product offering and easy to use payment options, specially designed for the Kenyan user space";

configs.address =
  "B-99, Spa Mall, Ruiru, Thika Road Exit 19";

// provide contact number with country code
configs.contactInfo = {
  email: "briannganga70@gmail.com",
  watsappNum: "+254791573545",
  androidAppLink: "#",
  iosAppLink: "#",
};

// Buttons, Icons, Some Imp text color
configs.primary = "#215273";
// Heade/Toolbar color
configs.secondary = "#E1F5FE";
// Footer color
configs.footer = "#c5c5c5";
// view all button
configs.viewall = "#900325";

configs.razorpay = {
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
};

configs.algolia = {
  app_id: process.env.REACT_APP_ALGOLIA_APP_ID,
  search_only_key: process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY,
};

// max cards in single pagination
configs.maxPageCards = 20;
// max categories on category bar below header
configs.maxCategoriesOnBar = 16;
// max categories on category box
configs.maxCategoriesInBox = 16;

// Open Pincodes check dialog when user clicks on "Add to my cart" button when the cart is empty
configs.openPincodeEmptyCart = false;

// Firebase functions base_url
configs.functionsURL =
  "#";

configs.usingAlgoliaFree = true;
