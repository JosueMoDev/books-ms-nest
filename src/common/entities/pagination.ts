export class Pagination {
  public currentPage!: number;
  public nextPage!: string | null;
  public previousPage!: string | null;
  public pageSize!: number;
  public totalPages!: number;
  public total!: number;

  constructor(args: Pagination) {
    const { currentPage, nextPage, previousPage, pageSize, totalPages, total } =
      args;
    this.currentPage = currentPage ?? 1;
    this.nextPage = nextPage ?? null;
    this.previousPage = previousPage ?? null;
    this.pageSize = pageSize ?? 5;
    this.totalPages = totalPages ?? 0;
    this.total = total ?? 0;
  }
  static dinamycOffset(page: number, pageSize: number): number {
    const skip = (page - 1) * pageSize;
    return skip;
  }

  static setPagination(object: { [key: string]: any }): Pagination {
    const { total, pageSize, path, page } = object;
    const currentPage = page;
    const totalPages = Math.ceil(total / pageSize);
    const nextPage =
      currentPage < totalPages
        ? `${path}?page=${page + 1}&pageSize=${pageSize}`
        : null;

    const previousPage =
      currentPage > 1 ? `${path}?page=${page - 1}&pageSize=${pageSize}` : null;

    const pagination = new Pagination({
      currentPage,
      nextPage,
      previousPage,
      pageSize,
      totalPages,
      total,
    });
    return pagination;
  }

  static pagination(object: { [key: string]: any }): Pagination {
    return Pagination.setPagination(object);
  }
}
