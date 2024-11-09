"use client";

import authAction from "@/apis/auth.api";

const TestPage = () => {
  const loginAction = authAction.useGetSession();
  console.log(loginAction.data?.data);

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={() => loginAction.refetch()}>Refetch</button>
    </div>
  );
};

export default TestPage;
