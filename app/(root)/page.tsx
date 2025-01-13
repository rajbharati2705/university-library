import BookList from "@/components/BookList";
import Bookoverview from "@/components/Bookoverview";
import { sampleBooks } from "@/constants";

const Home = () => {
  return (
    <>
      <Bookoverview {...sampleBooks[0]}></Bookoverview>
      <BookList
        title="Latest Book"
        books={sampleBooks}
        containerClassName="mt-28"
      ></BookList>
    </>
  );
};

export default Home;
