    // types.ts

    export interface User {
    firstName: string;
    lastName: string;
    }

    export interface Tag {
    id: string;
    name: string;
    }

    export interface BlogTag {
    id: string;
    tagId: string;
    blogId: string;
    tag: Tag; // Add the nested tag structure
    }

    export interface Blog {
    id: string;
    blogName: string;
    hook: string;
    blogCover: string;
    blogCoverPublicId?: string | null;
    desc: string;
    status: boolean;
    createdAt: Date;
    updatedAt?: Date;
    userId: string;
    user: User;
    blogTags: BlogTag[];
    }
