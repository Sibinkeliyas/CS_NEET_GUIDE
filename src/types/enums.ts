export const Api_endpoint = {
  user_auth: "api/authentication",
  user_signIn: "api/authentication/sign_in",
  user_verification: "api/authentication/verify_user",
  neet: "api/neet",
  ncert_solutions: "ncert-solutions",
  ncert_page_metadata: "ncert-solutions/meta-data",
  // syllabus
  get_syllabus: "api/neet/syllubus",
  // home
  get_books_details: "api/neet/book-introduction",
  // ai
  ai_doubt_module: "api/ai/doubt-module",
  ai_common_doubt_module: "api/ai/common-doubt-module",
  ai_prompts: "api/ai/prompts",
  doubt_module: "neet-chapterwise-bot",
  ai_common_neet_doubts: "neet-common-bot",
  ai_user_tokens: "/api/ai/user-tokens",
  // s3 upload
  s3_upload: "api/s3-upload",
  // Progress
  postProgress: "api/neet",
  //payment
  payment_initialization: "api/payment/initiate",
  payment_products: "api/payment/products",
};

export enum COUNTRY_CODE {
  INDIA = "91",
}

export enum AUTHENTICATION {
  ALREADY_ACC_EXIST = "Already have an account?",
  DONT_HAVE_AN_ACC = "Don’t have an account?",
  SIGN_IN = "Sign In",
  SIGN_UP = "Sign Up",
  LOGGED_IN_FAILED = "Login failed.",
  WELCOME = "Welcome to NEET Guide",
  SIGN_IN_CONTINUE = "Sign In to Continue.",
  SIGN_UP_CONTINUE = "Sign Up to Continue.",
  CONTINUE = "Continue",
  MOBILE_NO = "Mobile Number",
  ENTER_OTP = "Enter your OTP",
  WANT_TO_GO_BACK_LOGIN = "Do you want to go back to login page? ",
  CLICK_HERE = " Click here",
  LOGGED_IN_SUCCESSFULL = "Login successfully.",
  LOGGED_IN_SUCCESS_MESSAGE = "You have logged in successfully.",
  LOGOUT = "Log out",
}

export enum ERROR {
  SOMETHING_WENT_WRONG = "Something went wrong",
  NOT_AUTHORIZED = "Not authorized",
  NOT_AUTH_MSG = "You are not logged in, please log in to continue.",
  NO_DATA_FOUND = "No Data Found",
  NOT_A_VALID_USER = "Couldn't find authtoken or not a valid token",
  TOKENS_COMPLETED = "Not having enough tokens",
  PAYMENT_FAILED = 'Unable to process your payment at this time. Please check your details and try again'
}

export enum SUCCESS_MESSAGES {
  UPDATE = "Updated Succesfully",
}

export enum HOMEPAGE {
  READ = "Read",
  OVER_VIEW = "Overview",
  EXPAND = "Expand",
  CLOSE = "Close",
  WELCOME_TITLE = "Welcome to NEET Guide",
  WELCOME_DESC = `Welcome to NEET Guide, your ultimate resource for acing the NEET
                exam! Explore our comprehensive study materials, interactive
                practice tests, and expert tips to excel in Physics, Chemistry,
                and Biology. Join our community and start your journey to
                success today!`,
}

export enum SIDEBAR {
  REVISION_NOTES = "Revision Notes",
  START_AI_POWERED_LESSON = "Start AI Powered Lesson",
}

export enum CHAT {
  ASK_QUES = "Ask Your Doubts",
  LOGIN_ASK_QUESTION = "Login to ask your questions",
  ASK_DOUBTS_FROM = "Ask Doubts from",
}
export enum PATHNAMES {
  NCERT_PATH = "ncert-solutions",
  STUDY_NOTES = "study-notes",
}

export enum AI {
  ERROR_MESSAGE = "I'm sorry, but I'm unable to provide an answer to that question right now. If you have any other questions or need assistance with something else, feel free to ask!",
  CHAT_HISTORY_EMPTY = "Chat history is empty",
  TOKENS_COMPLETED = "Not having enough tokens",
  TOKENS_COMPLETED_DES = "Your tokens are completed. Kindly pay to continue.",
  ASK_DOUBTS = "Ask doubts",
  AI_MENTOR = "AI Mentor",
  START_UR_CHAT = "Hello, How can i help you today",
  TOKEN_COUNT = "Available tokens :",
  FOR_MORE_TOKENS = "For More tokens",
  BUY_NOW = "Buy Now",
  AI_SESSION_KEY = "ai-initial-msg",
}

export enum BOT_TYPE {
  COMMON_BOT = 1,
  ASK_DOUBTS = 2,
  MCQ = 3,
}

export enum ChapterProgressContent {
  CHAPTER = "Chapter",
  COMPLETED = "% Completed",
  CHAPTER_RANKED_QUIZ = "Chapter Ranked Quiz",
  UNLOCK = "Unlock at 80% progress",
  CURRENTLY_AT = "Currently at ",
}

export enum PAYMENT {
  MERCHANT_ID = "merchantId",
  TRANSACTION_ID = "transactionId",
  PAYMENT_SUCCESS_STATUS = "PAYMENT_SUCCESS",
  PAYMENT_INITIALIZED = "Initialized",
  PHONE_PE = "Phone Pe",
}

export const FOCUS_SIDEBAR_ROUTES = ["neet-mentor", "ask-your-doubts"];

export enum PRICING_TITLES {
  DOUBTS = 'Doubts',
  PLANS = 'PLANS',
  APPLY = 'Apply',
  BUYNOW = 'Buy Now',
  PRICING_PLANS = 'Pricing Plans',
  PRICING_CONTENT = ' Our pricing plans are designed to be affordable, flexible, and tailored to your unique needs.',
  PAYMENT_SUCCESS = 'Payment Success',
  PAYMENT_FAILED = 'Payment Failed',
  TRY_AGAIN = 'Try Again',
  BACK_HOME = 'Back to Home',  
}
