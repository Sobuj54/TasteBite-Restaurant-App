// src/pages/customer-account-order-history/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavigation from "components/ui/CustomerNavigation";
import Icon from "components/AppIcon";

import ProfileSection from "./components/ProfileSection";
import OrderHistorySection from "./components/OrderHistorySection";
import LoyaltyRewardsSection from "./components/LoyaltyRewardsSection";
import AddressesSection from "./components/AddressesSection";
import PaymentMethodsSection from "./components/PaymentMethodsSection";
import { Helmet } from "react-helmet";

function CustomerAccountOrderHistory() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    dietaryPreferences: ["vegetarian"],
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });
  const [loyaltyData, setLoyaltyData] = useState({
    points: 2450,
    tier: "Gold",
    nextTierPoints: 550,
    availableRewards: 12,
  });
  const navigate = useNavigate();

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "orders", label: "Orders", icon: "Package" },
    { id: "rewards", label: "Rewards", icon: "Award" },
    { id: "addresses", label: "Addresses", icon: "MapPin" },
    { id: "payments", label: "Payments", icon: "CreditCard" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSection
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        );
      case "orders":
        return <OrderHistorySection />;
      case "rewards":
        return (
          <LoyaltyRewardsSection
            loyaltyData={loyaltyData}
            setLoyaltyData={setLoyaltyData}
          />
        );
      case "addresses":
        return <AddressesSection />;
      case "payments":
        return <PaymentMethodsSection />;
      default:
        return (
          <ProfileSection
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>TasteBite | Account</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <CustomerNavigation />

        {/* Main Content */}
        <main className="pt-16">
          {/* Header Section */}
          <div className="border-b bg-surface shadow-soft border-border">
            <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
                    <span className="text-2xl font-heading font-heading-medium text-primary">
                      {userProfile?.firstName?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-heading font-heading-medium text-text-primary">
                      {userProfile?.firstName} {userProfile?.lastName}
                    </h1>
                    <p className="text-text-secondary font-body">
                      {userProfile?.email}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon
                          name="Award"
                          size={16}
                          className="text-warning-400"
                        />
                        <span className="text-sm font-body text-text-secondary">
                          {loyaltyData?.tier} Member
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={16} className="text-primary" />
                        <span className="text-sm font-body text-text-secondary">
                          {loyaltyData?.points} Points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Tab Menu Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 lg:hidden text-text-secondary hover:text-primary transition-smooth"
                >
                  <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex gap-6">
              {/* Desktop Sidebar Navigation */}
              <div className="flex-shrink-0 hidden w-64 lg:block">
                <div className="sticky p-6 rounded-lg bg-surface shadow-soft top-32">
                  <nav className="space-y-2">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => handleTabChange(tab?.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth font-body font-body-medium text-left ${
                          activeTab === tab?.id
                            ? "bg-primary-50 text-primary border border-primary-100"
                            : "text-text-secondary hover:text-primary hover:bg-primary-50"
                        }`}
                      >
                        <Icon name={tab?.icon} size={20} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>

                  {/* Quick Actions */}
                  <div className="pt-6 mt-8 border-t border-border">
                    <h3 className="mb-4 text-sm font-body font-body-medium text-text-primary">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => navigate("/menu-browse-search")}
                        className="flex items-center w-full px-4 py-2 space-x-3 text-sm rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50 transition-smooth font-body"
                      >
                        <Icon name="ShoppingBag" size={18} />
                        <span>Order Now</span>
                      </button>
                      <button className="flex items-center w-full px-4 py-2 space-x-3 text-sm rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50 transition-smooth font-body">
                        <Icon name="HeadphonesIcon" size={18} />
                        <span>Support</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                {/* Mobile Tab Navigation */}
                <div className="mb-6 lg:hidden">
                  <div className="rounded-lg bg-surface shadow-soft">
                    <div className="p-4 border-b border-border">
                      <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex items-center justify-between w-full py-2"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            name={tabs?.find((t) => t?.id === activeTab)?.icon}
                            size={20}
                            className="text-primary"
                          />
                          <span className="font-body font-body-medium text-text-primary">
                            {tabs?.find((t) => t?.id === activeTab)?.label}
                          </span>
                        </div>
                        <Icon
                          name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"}
                          size={20}
                          className="text-text-secondary"
                        />
                      </button>
                    </div>

                    {isMobileMenuOpen && (
                      <div className="p-2">
                        {tabs?.map((tab) => (
                          <button
                            key={tab?.id}
                            onClick={() => handleTabChange(tab?.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth font-body font-body-medium text-left min-h-touch ${
                              activeTab === tab?.id
                                ? "bg-primary-50 text-primary"
                                : "text-text-secondary hover:text-primary hover:bg-primary-50"
                            }`}
                          >
                            <Icon name={tab?.icon} size={20} />
                            <span>{tab?.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Active Section Content */}
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CustomerAccountOrderHistory;
