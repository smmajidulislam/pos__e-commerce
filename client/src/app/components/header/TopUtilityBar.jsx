"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopUtilityBar() {
  const [newsTop, setNewsTop] = useState(0);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsTop((prev) => (prev <= -30 ? 0 : prev - 15)); // Cycle through 3 items (0, -15, -30)
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="hidden lg:block">
        <div className="flex items-center">
          <div className="w-full lg:w-1/3">
            <div className="flex">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/about-us" title="About Us">
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/orders/tracking" title="Order Tracking">
                    <span>Order Tracking</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-5/12">
            <div className="text-center">
              <div
                id="news-flash"
                style={{
                  overflow: "hidden",
                  position: "relative",
                  height: "15px",
                }}
              >
                <ul
                  style={{
                    position: "absolute",
                    margin: 0,
                    padding: 0,
                    top: `${newsTop}px`,
                  }}
                >
                  <li
                    style={{
                      margin: 0,
                      padding: 0,
                      height: "15px",
                      display: "list-item",
                    }}
                  >
                    <i className="fi-rs-asterisk inline-block mr-1"></i>
                    <span className="inline-block">
                      <b className="text-red-600">Super Value Deals</b> - Save
                      more with coupons{" "}
                    </span>
                  </li>
                  <li
                    style={{
                      margin: 0,
                      padding: 0,
                      height: "15px",
                      display: "list-item",
                    }}
                  >
                    <i className="fi-rs-angle-double-right inline-block mr-1"></i>
                    <span className="inline-block">
                      {" "}
                      Get great devices up to 50% off{" "}
                    </span>
                    <Link className="active inline-block" href="/products">
                      &nbsp;View details
                    </Link>
                  </li>
                  <li style={{ margin: 0, padding: 0, height: "15px" }}>
                    <i className="fi-rs-bell inline-block mr-1"></i>
                    <span className="inline-block">
                      <b className="text-green-600"> Trendy 25</b> silver
                      jewelry, save up 35% off today{" "}
                    </span>
                    <Link className="active inline-block" href="/products">
                      &nbsp;Shop now
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="flex justify-end">
              <ul className="flex space-x-4">
                <li>
                  Need help? Call Us: &nbsp;
                  <strong className="text-brand"> 1900 - 888</strong>
                </li>
                <li
                  onMouseEnter={() => setShowLanguage(true)}
                  onMouseLeave={() => setShowLanguage(false)}
                >
                  <Link
                    className="language-dropdown-active"
                    href="javascript:void(0)"
                  >
                    <img
                      src="/assets/flags/en.svg"
                      alt="English Flag"
                      className="inline-block w-5 h-4 mr-1"
                    />
                    English <i className="fi-rs-angle-small-down"></i>
                  </Link>
                  <ul
                    className="language-dropdown"
                    style={{ display: showLanguage ? "block" : "none" }}
                  >
                    <li>
                      <Link href="/vi">
                        <img
                          src="/assets/flags/vi.svg"
                          alt="Vietnamese Flag"
                          className="inline-block w-5 h-4 mr-1"
                        />
                        &nbsp;<span>Tiếng Việt</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/ar">
                        <img
                          src="/assets/flags/ar.svg"
                          alt="Arabic Flag"
                          className="inline-block w-5 h-4 mr-1"
                        />
                        &nbsp;<span>Arabic</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  onMouseEnter={() => setShowCurrency(true)}
                  onMouseLeave={() => setShowCurrency(false)}
                >
                  <Link
                    className="language-dropdown-active"
                    href="javascript:void(0)"
                  >
                    USD <i className="fi-rs-angle-small-down"></i>
                  </Link>
                  <ul
                    className="language-dropdown"
                    style={{ display: showCurrency ? "block" : "none" }}
                  >
                    <li>
                      <Link href="/currency/switch/USD">USD</Link>
                    </li>
                    <li>
                      <Link href="/currency/switch/EUR">EUR</Link>
                    </li>
                    <li>
                      <Link href="/currency/switch/VND">VND</Link>
                    </li>
                    <li>
                      <Link href="/currency/switch/NGN">NGN</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden block bg-gray-100 p-2 text-center">
        <span>
          Grand opening, <strong>up to 15%</strong> off all items. Only{" "}
          <strong>3 days</strong> left
        </span>
      </div>
    </div>
  );
}
