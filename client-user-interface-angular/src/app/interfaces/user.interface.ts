export interface User {
    users: UserElement[];
}

export interface UserElement {
    id:              string;
    username:        string;
    email:           string;
    password:        string;
    phone:           string;
    profileImageUrl: null;
    roles:           string[];
    isActive:        boolean;
    createdAt:       Date;
    updatedAt:       Date;
}
