export const LOGIN_ENDPOINT = `${process.env.REACT_APP_ACCOUNT_URL}/auth/login_email`;
export const LOGOUT_ENDPOINT = `${process.env.REACT_APP_ACCOUNT_URL}/auth/logout`;
export const MY_PROFILE_ENDPOINT = `${process.env.REACT_APP_ACCOUNT_URL}/profile`;
export const MY_POSITION_ENDPOINT = `${process.env.REACT_APP_ACCOUNT_URL}/user_positions/my_position`;
export const SEND_RESET_PASSWORD_ENDPOINT = `${process.env.REACT_APP_ACCOUNT_URL}/auth/send_reset_password_email`;
export const CHANGE_PASSWORD_ENDPOINT = `${process.env.REACT_APP_ACCOUNT_URL}/profile/password`;
export const VIEW_ASSET_ENDPOINT = process.env.REACT_APP_ASSET_URL;

export const UPLOAD_IMAGE_ENDPOINT = `${process.env.REACT_APP_UPLOAD_URL}/image`;
export const UPLOAD_VIDEO_ENDPOINT = `${process.env.REACT_APP_UPLOAD_URL}/video`;

/**
 * INITIALIZATION DATA
 */
export const GET_VERSION_ENDPOINT = `${process.env.REACT_APP_API_URL}/versions/type/web`;
export const USER_ENDPOINT = `${process.env.REACT_APP_ACCOUNT_URL}/users`;
export const USER_POSITION_ENDPOINT = `${process.env.REACT_APP_ACCOUNT_URL}/user_positions`;

// insert end points end
