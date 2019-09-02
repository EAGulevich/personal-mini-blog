import faker from "faker";

/**
 * Класс для работы с постами
 */
class PostRepository {
  constructor() {}

  /**
   * Генерация массива `postCount` постов с комментариями
   * (кол-во комментариев к каждому посту определяется случайно, но не может быть больше `maxCommentCount`)
   * @param {Number} postCount - кол-во постов для генерации
   * @param {Number} maxCommentCount - максимальное кол-во комментариев для генерации к каждому посту
   * @returns {Object}
   */
  generate(postCount, maxCommentCount) {
    let posts = [];
    for (let i = 0; i < postCount; i++) {
      let post = this.create();
      post.name = faker.lorem.words(Math.random() * 5 + 1);
      post.shortDescription = faker.lorem.paragraphs(3);
      post.description = faker.lorem.paragraphs(10);

      let commentCount = Math.floor(Math.random() * (maxCommentCount + 1));
      let comments = [];
      for (let y = 0; y < commentCount; y++) {
        let comment = {
          author: faker.name.findName(),
          text: faker.lorem.sentences(Math.random() * 4 + 1)
        };
        comments.push(comment);
      }
      post.comments = comments;
      posts.push(post);
    }
    window.localStorage.setItem("posts", JSON.stringify(posts));
    return;
  }

  /**
   * Создание поста c начальными данными
   * @returns {Object}
   */
  create() {
    return {
      id: faker.random.uuid(),
      name: "",
      shortDescription: "",
      description: "",
      comments: []
    };
  }

  /**
   * Сохранение поста
   * @param {Object} payload - данные поста
   * @returns {Object}
   */
  save(payload) {
    return;
  }

  /**
   * Получение поста по ID
   * @param {String} id - идентификатор поста
   * @returns {Object}
   */
  get(id) {
    return;
  }

  /**
   * Получение постов
   * @param {Number} perPage - сколько отдать записей
   * @returns {Object}
   */
  getCollection(perPage) {
    let response = { data: [], total: 0 };
    let posts = window.localStorage.getItem("posts");
    if (!posts) {
      return response;
    }
    posts = JSON.parse(posts);

    response.total = posts.length;
    response.data = posts.slice(0, perPage);

    return response;
  }

  /**
   * Удаление поста по ID
   * @param {String} id - идентификатор поста
   * @returns {Object}
   */
  delete(id) {
    return;
  }
}

export default new PostRepository();
