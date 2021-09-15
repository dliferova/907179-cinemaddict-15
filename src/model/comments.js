import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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
    const adaptedComment = {};
    adaptedComment['comment'] = comment.comment;
    adaptedComment['emotion'] = comment.emotion;

    return adaptedComment;
  }
}
