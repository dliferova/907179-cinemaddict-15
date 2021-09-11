import dayjs from 'dayjs';

export default class Comments {

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        id: comment['id'],
        author: comment['author'],
        emotion: comment['emotion'],
        commentMessage: comment['comment'],
        date: dayjs(comment['date']),
      },
    );

    delete comment['id'];
    delete comment['author'];
    delete comment['emotion'];
    delete comment['comment'];
    delete comment['date'];

    return adaptedComment;
  }

  static adaptToServer(comment) {
    // TODO
  }
}
