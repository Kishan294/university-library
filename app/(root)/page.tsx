import { BookList } from "@/components/book-list";
import { BookOverview } from "@/components/book-overview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
