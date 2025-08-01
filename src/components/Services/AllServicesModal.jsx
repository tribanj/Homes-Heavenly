import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

const serviceCategories = [
  {
    title: "Buy & Sale Services",
    services: [
      {
        label: "Off-Plan & Pre-Launch Property Deals",
        path: "/services/buysale/OffPlanDeals",
        image:
          "https://azcb.co/wp-content/uploads/2023/08/Why-Invest-in-Off-Plan-Property-in-Dubai-_-Cover-18-8-22-1.jpg",
      },
      {
        label: "Free Property Valuation & Market Appraisal",
        path: "/services/buysale/BookValuation",
        image:
          "https://sellmycommercialproperty.wordpress.com/wp-content/uploads/2021/06/free-property-valuation.jpg",
      },
      {
        label: "Foreclosed & Distressed Property Sales",
        path: "/services/buysale/ForeclosedSales",
        image:
          "https://www.mashvisor.com/blog/wp-content/uploads/2018/06/bigstock-Foreclosure-Home-For-Sale-Sign-2357062.jpg",
      },
      {
        label: "Auctions & Bidding Support",
        path: "/services/buysale/AuctionSupport",
        image:
          "https://geauction.com/wp-content/uploads/2018/07/5-Auction-Tips-for-Beginners2.jpg",
      },
      {
        label: "Legal & Documentation Assistance for Transactions",
        path: "/services/buysale/TransactionLegalHelp",
        image:
          "https://sapphireproperties.com.pk/wp-content/uploads/2023/09/Legal-and-Documentation-Assistance.jpg",
      },
    ],
  },
  {
    title: "Rent & Lease Solutions",
    services: [
      {
        label: "Tenant Screening & Background Checks",
        path: "/services/RentLease/TenantScreening",
        image:
          "https://th.bing.com/th/id/OIP.HyPO0GQqnsGoMcauAHz_MQHaE7?w=299&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      },
      {
        label: "Lease Agreement Drafting & Renewal",
        path: "/services/RentLease/LeaseAgreement",
        image:
          "https://tse1.mm.bing.net/th/id/OIP.qICIl75oVKyqXnieLZuZnQHaE0?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        label: "Co-Living & Shared Housing Solutions",
        path: "/services/RentLease/CoLivingSolutions",
        image:
          "https://tse1.mm.bing.net/th/id/OIP.6dvGMq26SLMrtGn9dC9_HwHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        label: "Short-Term & Vacation Rentals",
        path: "/services/RentLease/VacationRentals",
        image:
          "https://th.bing.com/th/id/OIP.HyPO0GQqnsGoMcauAHz_MQHaE7?w=299&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      },
      {
        label: "Student Housing & PG Listings",
        path: "/services/RentLease/StudentHousing",
        image:
          "https://cdn.prod.website-files.com/65e9cc010830dfd2340bae71/65ec2979cf88488dc22d3b57_CRM%20Lumis%20-%20Cardiff%20High%20Resolution-8.webp",
      },
    ],
  },
  {
    title: "Property Management",
    services: [
      {
        label: "Rent Collection & Tenant Management",
        path: "/services/propertymanagement/RentCollection",
        image:
          "https://th.bing.com/th/id/R.016bd747e5c96e25e7e12e44b7a4c712?rik=qw1JVUWK224Jcw&riu=http%3a%2f%2f10starshomes.com%2fwp-content%2fuploads%2f2021%2f08%2f236578449_1249180902187319_5408685416113932251_n.jpg&ehk=ZJMFwLVZ9SRK2cZiW3BFjjCQ8YF%2bSsUpxzeVQGzxqro%3d&risl=&pid=ImgRaw&r=0",
      },
      {
        label: "Maintenance & Repairs Coordination",
        path: "/services/propertymanagement/MaintenanceRepairs",
        image:
          "https://tse3.mm.bing.net/th/id/OIP.urZrCSYu9cWAJP8LgrXlsQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        label: "Legal Dispute Resolution for Landlords & Tenants",
        path: "/services/propertymanagement/LegalDisputeResolution",
        image:
          "https://tse1.mm.bing.net/th/id/OIP.yYdNUhfAzLn18VV_qZl5SAHaE8?w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        label: "Home Insurance & Property Protection Plans",
        path: "/services/propertymanagement/HomeInsurancePlans",
        image: "https://wallpaperaccess.com/full/8942084.jpg",
      },
    ],
  },
  {
    title: "Investment Advisory",
    services: [
      {
        label: "Investment Planning & ROI Analysis",
        path: "/services/investmentadvisory/InvestmentPlanning",
        image:
          "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-9-bum-692-roib.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=69e256364871509209e7ba5a9a428a8c",
      },
      {
        label: "Land & Plot Investment Services",
        path: "/services/investmentadvisory/LandPlotInvestment",
        image:
          "https://tse3.mm.bing.net/th/id/OIP.YgIqYc_u0ABgWkMW8DeQMgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        label: "Fractional Ownership & REIT Investment",
        path: "/services/investmentadvisory/FractionalOwnership",
        image:
          "https://th.bing.com/th/id/OIP.iKElYvd70dLYXj1f9KOLHQHaEv?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        label: "Market Trends & Price Forecasting",
        path: "/services/investmentadvisory/MarketTrends",
        image:
          "https://thumbs.dreamstime.com/b/market-forecasting-focus-professionals-study-trends-giant-screen-analyzing-future-projections-dynamic-arrows-strategy-302160001.jpg",
      },
    ],
  },
  {
    title: "Financial & Legal Services",
    services: [
      {
        label: "Home Loan & Mortgage Assistance",
        path: "/services/financialservices/HomeLoanAssistance",
        image:
          "https://finiscope.advertroindia.co.in/uploads-advertro-03-08-2019/FINISCOPE/products/55/housing-loan.jpg",
      },
      {
        label: "Loan Refinancing & Balance Transfer",
        path: "/services/financialservices/LoanRefinancing",
        image: "https://www.creditsure.in/img/balance-transfer-loan.jpg",
      },
      {
        label: "Property Title Verification & Due Diligence",
        path: "/services/legalservices/TitleVerification",
        image:
          "https://lawzapo.com/wp-content/uploads/2024/01/=MjN1QTOe5VeltmY05lXIFmczh2Xt8FVpRHbl9lVlJXaml2YhRXav52XEVXZfRUasl2Zl52Yl1SM3ATN5IDMyEjN.png",
      },
      {
        label: "RERA Compliance & Registration Assistance",
        path: "/services/legalservices/RERACompliance",
        image: "https://legaldev.in/assets/img/services/rera-1.jpg",
      },
      {
        label: "Stamp Duty & Property Registration Support",
        path: "/services/legalservices/StampDutySupport",
        image: "https://www.ghar.tv/blog/pics/2231.jpg?a=1749617452",
      },
    ],
  },
  {
    title: "Construction & Design",
    services: [
      {
        label: "Custom Home Construction & Architectural Design",
        path: "/services/constructionservices/CustomHomeConstruction",
        image:
          "https://th.bing.com/th/id/R.064827a705dec49ad16e0916a0c2e525?rik=82bYT3G8NADfaQ&riu=http%3a%2f%2fbuildblock.com%2fwp-content%2fuploads%2fiStock_000005275115XLarge-e1472140399230.jpg&ehk=uORV8rg%2f2aIepN6vxGy%2bmmpZIVm8vuxvgTHVK8ONtdY%3d&risl=&pid=ImgRaw&r=0",
      },
      {
        label: "Interior Designing & Home Furnishing",
        path: "/services/constructionservices/InteriorDesigning",
        image:
          "https://tse4.mm.bing.net/th/id/OIP.CVfjodDEmbLnUh04XU3a9AHaFz?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        label: "Smart Home & Automation Installations",
        path: "/services/constructionservices/SmartHomeInstallations",
        image:
          "https://bmcav.com.au/web/image/23505-0857cff0/Smart%20Home%20BMC2.jpg",
      },
      {
        label: "Landscaping & Outdoor Living Solutions",
        path: "/services/constructionservices/LandscapingSolutions",
        image:
          "https://tse1.mm.bing.net/th/id/OIP.h_DhuYyDKbjspni3E46-6QHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    ],
  },
];

const AllServicesModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#101828] max-w-7xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-8 shadow-2xl relative border border-gray-700"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
              <h2 className="text-3xl text-white font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
                Explore Our Services
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-12">
              {serviceCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-amber-500 pl-4">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {category.services.map((service, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        className="bg-[#1d293b] text-white rounded-lg cursor-pointer overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-shadow border border-gray-700 flex flex-col group"
                        onClick={() => {
                          onClose();
                          navigate(service.path);
                        }}
                      >
                        <div className="w-full h-40 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.label}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4 flex-grow flex items-center justify-center">
                          <h3 className="text-sm font-semibold text-center w-full">
                            {service.label}
                          </h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllServicesModal;
