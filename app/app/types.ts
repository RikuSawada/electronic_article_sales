export type BookProps = {
  book: {
    thumbnail: string;
    title: string;
    author: {
      description: string;
    };
    price: number;
  };
};
