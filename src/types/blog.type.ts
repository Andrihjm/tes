export type BlogType = {
  id: string | number;
  user_id: string | number;
  title: string;
  body: string;
};

export type PaginationType = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
};

export type BlogPaginationResponseType = {
  data: BlogType[];
  pagination: PaginationType;
};
