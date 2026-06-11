import { AnalyticsDashboard } from '@/types';

export const analyticsDashboards: AnalyticsDashboard[] = [
  {
    id: 'pizza-sales',
    title: 'Pizza Sales Dashboard',
    description:
      'Interactive sales analytics dashboard built using Tableau to analyze revenue, orders, product performance, peak hours and sales trends.',
    category: 'Sales',
    insights: [
      'Peak orders occur between 12 PM–2 PM and 6 PM–8 PM',
      'Large pizzas generated the highest revenue',
      'Classic category contributed maximum sales'
    ],
    externalUrl: 'https://public.tableau.com/views/PizzaSales_17811026750450/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    image: '/dashboards/pizza-sales.png'
  },

  {
    id: 'netflix',
    title: 'Netflix Analytics Dashboard',
    description:
      'Data visualization dashboard exploring Netflix content distribution, genres, countries and yearly content growth.',
    category: 'Marketing',
    insights: [
      'Movies significantly outnumber TV shows',
      'United States has the highest content count',
      'Content additions peaked during 2019–2020'
    ],
    externalUrl: 'https://public.tableau.com/views/Netflix_17811041776210/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    image: '/dashboards/netflix.png'
  },

  {
    id: 'instagram',
    title: 'Instagram Influencer Analytics',
    description:
      'Social media analytics dashboard measuring influencer engagement, followers, likes and audience performance.',
    category: 'Marketing',
    insights: [
      'Top influencers contribute majority of engagement',
      'Follower count does not always correlate with engagement',
      'Micro influencers show strong engagement rates'
    ],
    externalUrl: 'https://public.tableau.com/views/InstaAnalytics/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    image: '/dashboards/instagram.png'
  },

  {
    id: 'supply-chain',
    title: 'Supply Chain Management Dashboard',
    description:
      'Business intelligence dashboard analyzing manufacturing costs, supplier performance and logistics efficiency.',
    category: 'Operation',
    insights: [
      'Supplier 1 showed highest manufacturing cost',
      'Shipping costs directly impact profitability',
      'Production volume trends identify bottlenecks'
    ],
    externalUrl: 'https://public.tableau.com/views/SupplyChainManagement_17811048242670/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    image: '/dashboards/supply-chain.png'
  },

  {
    id: 'coffee-shop',
    title: 'Coffee Shop Sales Dashboard',
    description:
      'Retail sales dashboard tracking revenue, coffee sales, payment methods and customer purchasing patterns.',
    category: 'Sales',
    insights: [
      'Weekday sales exceed weekend sales',
      'Latte is the best-selling coffee product',
      'Cashless payments dominate transactions'
    ],
    externalUrl: 'https://public.tableau.com/views/CoffeesalesPerformence/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    image: '/dashboards/coffee-shop.png'
  },

  {
    id: 'stock-market',
    title: 'Stock Market Analysis Dashboard',
    description:
      'Financial dashboard visualizing stock performance, trading volume, volatility and company market share.',
    category: 'Finance',
    insights: [
      'AAPL has highest market share',
      'Volume spikes indicate trend reversals',
      'Daily returns highlight market volatility'
    ],
    externalUrl: 'https://public.tableau.com/views/StockMarket_17811071764340/Dashboard2?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    image: '/dashboards/stock-market.png'
  },

  {
    id: 'hr-dashboard',
    title: 'HR Analytics Dashboard',
    description:
      'Human resources dashboard analyzing employee demographics, attrition, salary trends and workforce performance.',
    category: 'HR',
    insights: [
      'Production department has highest attrition',
      'Average employee tenure exceeds 12 years',
      'Monthly headcount shows steady growth'
    ],
    externalUrl: 'https://public.tableau.com/views/HumanRecources/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    image: '/dashboards/hr-dashboard.png'
  },

  {
    id: 'financial-dashboard',
    title: 'Financial Overview Dashboard',
    description:
      'Executive finance dashboard tracking sales, profit, margins, discounts and business performance metrics.',
    category: 'Finance',
    insights: [
      'Government segment contributes highest profit',
      'Monthly profit peaks during Q4',
      'Discount strategy impacts overall profitability'
    ],
    externalUrl: 'https://public.tableau.com/views/FinancialOverview_17811046162920/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    image: '/dashboards/financial-dashboard.png'
  }
];