export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface FriendLink {
  id: number;
  created_on: number;
  updated_on: number;
  deleted_on: number;
  is_deleted: boolean;
  name: string;
  en_name: string;
  url: string;
  description: string;
  en_description: string;
  logo: string;
  share_code: string;
  status: number;
  admin_id: number;
  is_active: boolean;
  sort_order: number;
  remark: string;
  en_remark: string;
}

export interface FriendLinksData {
  links: FriendLink[];
} 