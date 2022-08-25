module.exports = ({ data, count, page, per_page }) => {
  const total_page = Math.ceil(count / per_page);
  const previous_page = page == 1 ? null : page - 1;
  const next_page = page == total_page ? null : page + 1;

  const result = {
    data,
    pagination: {
      total_records: count,
      total_page,
      next_page,
      previous_page,
    },
  };
  return result;
};
