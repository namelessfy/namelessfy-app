const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

function populate(query, populators) {
  populators?.forEach((_) => {
    query.populate(_);
  });

  return query;
}

class AbstractRepository {
  constructor(repo) {
    this.repo = repo;
  }

  create(options) {
    return normalizeDBQuery(db[this.repo].create(options));
  }

  getAll(query, populators) {
    let toNormalizeQuery = populate(db[this.repo].find(query), populators);

    return normalizeDBQuery(toNormalizeQuery);
  }

  getOne(query, populators) {
    let toNormalizeQuery = populate(db[this.repo].findOne(query), populators);

    return normalizeDBQuery(toNormalizeQuery);
  }

  async findOneAndUpdate(query, data, populators) {
    const response = await normalizeDBQuery(
      db[this.repo].findByIdAndUpdate(query, data),
    );

    if (response.error) {
      return response;
    } else {
      let toNormalizeQuery = populate(db[this.repo].findOne(query), populators);

      return normalizeDBQuery(toNormalizeQuery);
    }
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db[this.repo].findByIdAndDelete(query));
  }
}

module.exports = AbstractRepository;
