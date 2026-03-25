import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section>
      <div>page</div>
      <Link href="/users/new">New Users</Link>
    </section>
  );
};

export default page;
