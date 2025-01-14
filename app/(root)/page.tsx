import BookList from "@/components/BookList";
import Bookoverview from "@/components/Bookoverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {
  const result = await db.select().from(users);
  console.log("result", result);
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
