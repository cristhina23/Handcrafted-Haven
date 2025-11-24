"use client";

import Link from "next/link";

interface BreadCrumbProps {
  title: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ title }) => {
  return (
    <div className="breadcrumb mb-0 py-2">
      <div className="container-xl">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <p className="text-center mb-0">
              <Link href="/" className="text-dark">
                Home&nbsp;
              </Link>
              / {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
