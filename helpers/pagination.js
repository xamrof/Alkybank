const pagination = (totalItems, limit, parsePage, req) => {
  const totalPages = Math.ceil(totalItems / limit)
  const nextPage = totalPages - parsePage > 1 ? req.protocol + '://' + req.get('host') + req.baseUrl + `?page=${parsePage + 1}` : ''
  const previousPage = parsePage > 0 ? req.protocol + '://' + req.get('host') + req.baseUrl + `?page=${parsePage - 1}` : ''

  return {
    totalItems,
    itemsPerPage: limit,
    currentPage: parsePage,
    totalPages,
    previousPage,
    nextPage
  }
}

module.exports = pagination
