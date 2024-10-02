interface UserData {
    access_token: string;
    token_type: string;
    user: {
        email: string;
        full_name: string;
        email_verified: boolean;
        id: string;
    };
    expires_in: number;
    refresh_token: string;
    accessTokenExpires: number;
  }

  interface ProfileData {
    "full_name": "string",
    "email": "string",
    "phone": "string",
    "affiliation": "string",
    "user_type": "visitor",
    "id": "string",
    "is_verified": boolean
  }