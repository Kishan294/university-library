import { BookList } from "@/components/book-list";
import { BookOverview } from "@/components/book-overview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

import sendEmail from "@/lib/nodemailer";

const Home = async () => {
  // const response = await sendEmail({
  //   to: "development9943@gmail.com",
  //   subject: "Welcome to the platform",
  //   html: "<p>Hey hello</p>",
  // });

  // console.log({ response });
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
