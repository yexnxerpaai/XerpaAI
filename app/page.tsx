"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  TrendingUp,
  Users,
  MessageSquare,
  Target,
  Award,
  Calendar,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Zap,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  DollarSign,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Heart,
  Brain,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Mock data for KPIs
const kpiData = {
  xerpaIndex: { value: 847, change: 12.5, trend: "up" },
  influentialFollowers: { value: 156000, change: 8.3, trend: "up" },
  totalFollowers: { value: 24.7, change: 15.2, trend: "up" },
  totalEngagement: { value: 89500, change: 18.7, trend: "up" },
  engagementRate: { value: 3.5, change: -0.8, trend: "down" },
  sentiment: {
    positive: 78.5,
    neutral: 15.2,
    negative: 6.3,
    change: 5.2,
    trend: "up",
  },
}

const velocitySparklineData = [
  { value: 18.2 },
  { value: 19.8 },
  { value: 22.1 },
  { value: 20.5 },
  { value: 23.4 },
  { value: 24.7 },
]

// Mock data for trend chart
const trendData = [
  { date: "Nov 1", xerpa: 680, competitor1: 650, competitor2: 720, competitor3: 660 },
  { date: "Nov 8", xerpa: 720, competitor1: 665, competitor2: 715, competitor3: 675 },
  { date: "Nov 15", xerpa: 765, competitor1: 695, competitor2: 745, competitor3: 710 },
  { date: "Nov 22", xerpa: 810, competitor1: 715, competitor2: 760, competitor3: 725 },
  { date: "Dec 1", xerpa: 820, competitor1: 720, competitor2: 750, competitor3: 730 },
  { date: "Dec 8", xerpa: 835, competitor1: 725, competitor2: 745, competitor3: 735 },
  { date: "Dec 15", xerpa: 840, competitor1: 730, competitor2: 760, competitor3: 740 },
  { date: "Dec 22", xerpa: 847, competitor1: 730, competitor2: 755, competitor3: 740 },
]

const availableCompetitors = [
  { id: "comp-a", name: "Competitor A", suggested: true },
  { id: "comp-b", name: "Competitor B", suggested: true },
  { id: "comp-c", name: "Competitor C", suggested: false },
  { id: "comp-d", name: "Competitor D", suggested: false },
  { id: "comp-e", name: "Competitor E", suggested: false },
]

// Mock data for efficiency chart
const efficiencyData = [
  { name: "XerpaAI", costPerPoint: 0.12, xerpaIndex: 847 },
  { name: "Competitor A", costPerPoint: 0.18, xerpaIndex: 730 },
  { name: "Competitor B", costPerPoint: 0.15, xerpaIndex: 755 },
  { name: "Competitor C", costPerPoint: 0.22, xerpaIndex: 740 },
]

const topPosts = [
  {
    id: 1,
    content: "Revolutionary AI breakthrough in Web3 analytics...",
    influenceScore: 94,
    engagement: "2.4K",
    platform: "Twitter",
    thumbnail: "/placeholder.svg?height=40&width=40",
    sparklineData: [{ value: 120 }, { value: 180 }, { value: 240 }, { value: 200 }, { value: 240 }],
  },
  {
    id: 2,
    content: "Partnership announcement with leading DeFi protocol...",
    influenceScore: 87,
    engagement: "1.8K",
    platform: "LinkedIn",
    thumbnail: "/placeholder.svg?height=40&width=40",
    sparklineData: [{ value: 80 }, { value: 120 }, { value: 160 }, { value: 180 }, { value: 180 }],
  },
  {
    id: 3,
    content: "Community milestone: 100K+ active users...",
    influenceScore: 82,
    engagement: "1.5K",
    platform: "Twitter",
    thumbnail: "/placeholder.svg?height=40&width=40",
    sparklineData: [{ value: 60 }, { value: 90 }, { value: 120 }, { value: 140 }, { value: 150 }],
  },
]

const topKOLs = [
  {
    name: "@CryptoInfluencer",
    engagement: "45.2K",
    reach: "890K",
    posts: 12,
    score: 96,
  },
  {
    name: "@BlockchainExpert",
    engagement: "38.1K",
    reach: "720K",
    posts: 8,
    score: 89,
  },
  {
    name: "@DeFiAnalyst",
    engagement: "32.5K",
    reach: "650K",
    posts: 15,
    score: 85,
  },
  {
    name: "@Web3Guru",
    engagement: "28.9K",
    reach: "580K",
    posts: 10,
    score: 82,
  },
  {
    name: "@NFTSpecialist",
    engagement: "25.3K",
    reach: "520K",
    posts: 7,
    score: 78,
  },
  {
    name: "@MetaverseLeader",
    engagement: "22.1K",
    reach: "480K",
    posts: 9,
    score: 75,
  },
  {
    name: "@TokenAnalyzer",
    engagement: "19.8K",
    reach: "440K",
    posts: 11,
    score: 72,
  },
  {
    name: "@SmartContractDev",
    engagement: "17.5K",
    reach: "400K",
    posts: 6,
    score: 69,
  },
  {
    name: "@DAOAdvocate",
    engagement: "15.2K",
    reach: "360K",
    posts: 13,
    score: 66,
  },
  {
    name: "@YieldFarmer",
    engagement: "12.9K",
    reach: "320K",
    posts: 8,
    score: 63,
  },
]

const aiInsights = [
  {
    id: 1,
    category: "Growth Opportunity",
    title: "Regional Growth Acceleration Detected",
    summary: "South Korea market showing 40% higher engagement rates than global average",
    detail:
      "Our AI analysis reveals that your content performs exceptionally well in South Korea, with engagement rates 40% higher than your global average. Competitor A is struggling in this region with only 15% engagement growth compared to your 40%. Recommendation: Increase budget allocation to Korean market by 25% and consider partnering with local KOLs. Expected ROI: 180% based on current trends. Timeline: Implement within 2 weeks for maximum impact during Q1 2024.",
    icon: TrendingUp,
    color: "green",
    details:
      "Detailed analysis reveals a surge in user activity and positive sentiment towards your brand in South Korea. This trend is driven by increased adoption of Web3 technologies and a growing interest in your specific niche. Our models predict continued growth in this region, making it a prime target for expansion.",
    actions: [
      "Increase budget allocation to Korean market by 25%",
      "Partner with local KOLs for targeted campaigns",
      "Translate content into Korean for better engagement",
    ],
    impact: "180% ROI based on current trends",
    timeline: "Implement within 2 weeks for maximum impact during Q1 2024",
  },
  {
    id: 2,
    category: "Content Strategy",
    title: "Partnership Content Optimization",
    summary: "Partnership announcements generate 65% higher engagement than product updates",
    detail:
      "Data analysis shows partnership announcements consistently outperform other content types by 65%. Your recent collaboration posts averaged 2.4K engagements vs 1.5K for product updates. Competitor analysis reveals they're missing this opportunity entirely. Recommendation: Develop a dedicated partnership content calendar with 2-3 announcements per month. Focus on visual storytelling and behind-the-scenes content. Projected impact: 30% increase in overall engagement within 60 days.",
    icon: MessageSquare,
    color: "blue",
    details:
      "In-depth analysis of your content performance reveals a strong correlation between partnership announcements and increased user engagement. This suggests that your audience is highly receptive to collaborative content and values the insights gained from your partnerships.",
    actions: [
      "Develop a dedicated partnership content calendar with 2-3 announcements per month",
      "Focus on visual storytelling and behind-the-scenes content",
      "Highlight the benefits of your partnerships for your audience",
    ],
    impact: "30% increase in overall engagement within 60 days",
    timeline: "Implement within 30 days for optimal results",
  },
  {
    id: 3,
    category: "Timing Optimization",
    title: "Peak Engagement Window Identified",
    summary: "Tuesday-Thursday 2-4 PM UTC shows 65% higher interaction rates",
    detail:
      "Advanced timing analysis reveals optimal posting windows with 65% higher interaction rates during Tuesday-Thursday, 2-4 PM UTC. This coincides with peak activity in your key markets (US East Coast morning, Europe afternoon, Asia evening). Your competitors are posting randomly, missing these high-value windows. Recommendation: Schedule all major announcements during these peak times. Use automated scheduling tools to maintain consistency. Expected outcome: 45% improvement in organic reach and 25% increase in conversion rates.",
    icon: Calendar,
    color: "amber",
    details:
      "Our advanced timing analysis has identified a peak engagement window during Tuesday-Thursday, 2-4 PM UTC. This coincides with peak activity in your key markets, including the US East Coast morning, Europe afternoon, and Asia evening. By optimizing your posting schedule, you can significantly increase your organic reach and conversion rates.",
    actions: [
      "Schedule all major announcements during these peak times",
      "Use automated scheduling tools to maintain consistency",
      "Monitor engagement rates during different time slots to refine your strategy",
    ],
    impact: "45% improvement in organic reach and 25% increase in conversion rates",
    timeline: "Implement immediately for best results",
  },
  {
    id: 4,
    category: "Competitive Intelligence",
    title: "Market Gap Opportunity",
    summary: "Competitors underperforming in DeFi education content by 35%",
    detail:
      "Market analysis shows a significant content gap in DeFi education space. Your competitors are underperforming by 35% in this category, while your educational content receives 2.8x more engagement than promotional posts. There's a clear opportunity to establish thought leadership. Recommendation: Launch a weekly DeFi education series, collaborate with industry experts, and create interactive content like AMAs and tutorials. Potential market capture: 15-20% increase in market share within 90 days.",
    icon: BarChart3,
    color: "blue",
    details:
      "Our market analysis has identified a significant content gap in the DeFi education space. Your competitors are underperforming by 35% in this category, while your educational content receives 2.8x more engagement than promotional posts. This presents a clear opportunity to establish thought leadership and capture a larger share of the market.",
    actions: [
      "Launch a weekly DeFi education series",
      "Collaborate with industry experts to create high-quality content",
      "Create interactive content like AMAs and tutorials",
    ],
    impact: "15-20% increase in market share within 90 days",
    timeline: "Launch within 4 weeks to capitalize on the current market trend",
  },
  {
    id: 5,
    category: "Efficiency Optimization",
    title: "Budget Reallocation Recommendation",
    summary: "Twitter campaigns showing 3x better ROI than other platforms",
    detail:
      "Performance analysis indicates Twitter campaigns are delivering 3x better ROI compared to other platforms. Cost per influence point on Twitter: $0.08 vs LinkedIn: $0.24, Telegram: $0.18. Your current budget allocation doesn't reflect this performance difference. Recommendation: Reallocate 40% of LinkedIn budget to Twitter, maintain Telegram for community building. Implement A/B testing for optimal content mix. Expected result: 25% improvement in overall campaign efficiency and 35% reduction in cost per acquisition.",
    icon: PieChart,
    color: "green",
    details:
      "Our performance analysis indicates that Twitter campaigns are delivering 3x better ROI compared to other platforms. The cost per influence point on Twitter is significantly lower than on LinkedIn and Telegram. Your current budget allocation doesn't reflect this performance difference, leading to suboptimal campaign efficiency.",
    actions: [
      "Reallocate 40% of LinkedIn budget to Twitter",
      "Maintain Telegram for community building",
      "Implement A/B testing for optimal content mix",
    ],
    impact: "25% improvement in overall campaign efficiency and 35% reduction in cost per acquisition",
    timeline: "Implement immediately to maximize ROI",
  },
]

const efficiencyTimeSeriesData = [
  { date: "Nov 1", indexPerExpense: 0.16, followersPerExpense: 0.06, rawExpense: 4200 },
  { date: "Nov 8", indexPerExpense: 0.15, followersPerExpense: 0.07, rawExpense: 4600 },
  { date: "Nov 15", indexPerExpense: 0.14, followersPerExpense: 0.08, rawExpense: 5000 },
  { date: "Nov 22", indexPerExpense: 0.13, followersPerExpense: 0.085, rawExpense: 5400 },
  { date: "Dec 1", indexPerExpense: 0.14, followersPerExpense: 0.08, rawExpense: 5200 },
  { date: "Dec 8", indexPerExpense: 0.13, followersPerExpense: 0.09, rawExpense: 5800 },
  { date: "Dec 15", indexPerExpense: 0.12, followersPerExpense: 0.1, rawExpense: 6200 },
  { date: "Dec 22", indexPerExpense: 0.12, followersPerExpense: 0.11, rawExpense: 6800 },
]

const newsData = {
  client: [
    {
      id: 1,
      headline: "XerpaAI Announces Strategic Partnership with Leading DeFi Protocol",
      source: "CoinDesk",
      date: "2024-01-15",
      category: "Partnership",
    },
    {
      id: 2,
      headline: "XerpaAI Reaches 100K Active Users Milestone in Q4 2023",
      source: "TechCrunch",
      date: "2024-01-12",
      category: "Growth",
    },
    {
      id: 3,
      headline: "New AI-Powered Analytics Features Launch on XerpaAI Platform",
      source: "The Block",
      date: "2024-01-10",
      category: "Product",
    },
  ],
  competitor: [
    {
      id: 4,
      headline: "Competitor A Raises $50M Series B for Web3 Analytics Expansion",
      source: "VentureBeat",
      date: "2024-01-14",
      competitor: "Competitor A",
    },
    {
      id: 5,
      headline: "Competitor B Launches New Social Media Monitoring Tool",
      source: "Decrypt",
      date: "2024-01-11",
      competitor: "Competitor B",
    },
    {
      id: 6,
      headline: "Competitor C Reports 200% Growth in Enterprise Clients",
      source: "Forbes",
      date: "2024-01-09",
      competitor: "Competitor C",
    },
  ],
  industry: [
    {
      id: 7,
      headline: "Web3 Analytics Market Expected to Reach $15B by 2025",
      source: "Market Research Future",
      date: "2024-01-13",
      category: "Market Analysis",
    },
    {
      id: 8,
      headline: "Social Media Influence Tracking Becomes Key for Crypto Projects",
      source: "CoinTelegraph",
      date: "2024-01-08",
      category: "Industry Trend",
    },
    {
      id: 9,
      headline: "Regulatory Changes Impact Social Media Marketing in Crypto Space",
      source: "Regulatory News",
      date: "2024-01-07",
      category: "Regulation",
    },
  ],
}

export default function InfluenceGrowthDashboard() {
  const [timePeriod, setTimePeriod] = useState("30d")
  const [expandedInsights, setExpandedInsights] = useState<number[]>([])
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(["comp-a", "comp-b", "comp-c"])
  const [competitorSearch, setCompetitorSearch] = useState("")
  const [useSuggested, setUseSuggested] = useState(false)
  const [efficiencyMetric, setEfficiencyMetric] = useState("indexPerExpense")
  const [showExpenseOverlay, setShowExpenseOverlay] = useState(false)
  const [showAllKOLs, setShowAllPosts] = useState(false)
  const [showAllPosts, setShowInfluentialOnly] = useState(false)
  const [showInfluentialOnly, setShowAllKOLs] = useState(false)

  console.log("[v0] Trend data:", trendData)
  console.log("[v0] Efficiency data:", efficiencyTimeSeriesData)

  const getTrendIcon = (trend: string, size = "w-4 h-4") => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className={`${size} text-green-600`} />
      case "down":
        return <ArrowDownRight className={`${size} text-red-600`} />
      default:
        return <Minus className={`${size} text-gray-600`} />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const toggleInsight = (id: number) => {
    setExpandedInsights((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const filteredCompetitors = availableCompetitors.filter((comp) =>
    comp.name.toLowerCase().includes(competitorSearch.toLowerCase()),
  )

  const efficiencyMetrics = {
    totalBudget: 25000,
    currentExpense: 6800,
    expenseToIndexRatio: 6800 / (847 - 720), // Current expense / Change in Xerpa Index
    expenseToFollowersRatio: 6800 / (156000 - 144000), // Current expense / New Influential Followers
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">Influence Growth Dashboard</h1>
              <p className="text-muted-foreground mt-1">Track your influence metrics and competitor performance</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Timeframe Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Timeframe:</span>
                <div className="flex bg-muted rounded-lg p-1">
                  {["7d", "30d", "90d"].map((period) => (
                    <Button
                      key={period}
                      variant={timePeriod === period ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTimePeriod(period)}
                      className={`px-3 py-1 text-xs ${
                        timePeriod === period ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-background"
                      }`}
                    >
                      {period === "7d" ? "7 days" : period === "30d" ? "30 days" : "90 days"}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Xerpa Index</CardTitle>
                <Target className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{kpiData.xerpaIndex.value}</div>
                <div className="flex items-center text-xs mt-1">
                  {getTrendIcon(kpiData.xerpaIndex.trend)}
                  <span className={`ml-1 ${getTrendColor(kpiData.xerpaIndex.trend)}`}>
                    {kpiData.xerpaIndex.change > 0 ? "+" : ""}
                    {kpiData.xerpaIndex.change}% vs last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Followers</CardTitle>
                <Zap className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{kpiData.totalFollowers.value}K</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-xs">
                    {getTrendIcon(kpiData.totalFollowers.trend)}
                    <span className={`ml-1 ${getTrendColor(kpiData.totalFollowers.trend)}`}>
                      {kpiData.totalFollowers.change > 0 ? "+" : ""}
                      {kpiData.totalFollowers.change}% growth
                    </span>
                  </div>
                  <div className="w-16 h-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={velocitySparklineData}>
                        <Line type="monotone" dataKey="value" stroke="#ea580c" strokeWidth={2} dot={false} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Influential Followers</CardTitle>
                <Users className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">
                  {kpiData.influentialFollowers.value.toLocaleString()}
                </div>
                <div className="flex items-center text-xs mt-1">
                  {getTrendIcon(kpiData.influentialFollowers.trend)}
                  <span className={`ml-1 ${getTrendColor(kpiData.influentialFollowers.trend)}`}>
                    {kpiData.influentialFollowers.change > 0 ? "+" : ""}
                    {kpiData.influentialFollowers.change}% growth
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Card className="border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Engagement</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-blue-600" />
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        id="influential-only"
                        checked={showInfluentialOnly}
                        onChange={(e) => setShowInfluentialOnly(e.target.checked)}
                        className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="influential-only" className="text-xs text-muted-foreground">
                        Influential-only
                      </label>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {showInfluentialOnly
                    ? (kpiData.totalEngagement.value * 0.6).toLocaleString()
                    : kpiData.totalEngagement.value.toLocaleString()}
                </div>
                <div className="flex items-center text-xs mt-1">
                  {getTrendIcon(kpiData.totalEngagement.trend)}
                  <span className={`ml-1 ${getTrendColor(kpiData.totalEngagement.trend)}`}>
                    {kpiData.totalEngagement.change > 0 ? "+" : ""}
                    {kpiData.totalEngagement.change}% vs last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{kpiData.engagementRate.value}%</div>
                <div className="flex items-center text-xs mt-1">
                  {getTrendIcon(kpiData.engagementRate.trend)}
                  <span className={`ml-1 ${getTrendColor(kpiData.engagementRate.trend)}`}>
                    {kpiData.engagementRate.change > 0 ? "+" : ""}
                    {kpiData.engagementRate.change}% vs last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Sentiment</CardTitle>
                <MessageSquare className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{kpiData.sentiment.positive}%</div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <div className="flex items-center">
                    {getTrendIcon(kpiData.sentiment.trend)}
                    <span className={`ml-1 ${getTrendColor(kpiData.sentiment.trend)}`}>
                      {kpiData.sentiment.change > 0 ? "+" : ""}
                      {kpiData.sentiment.change}% positive
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Neutral: {kpiData.sentiment.neutral}% • Negative: {kpiData.sentiment.negative}%
                </div>
                <button
                  onClick={() => {
                    const sentimentSection = document.getElementById("sentiment-analysis")
                    sentimentSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="mt-2 text-xs text-green-600 hover:text-green-700 underline"
                >
                  View Details →
                </button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Competitor Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="suggested" checked={useSuggested} onCheckedChange={setUseSuggested} />
                    <label htmlFor="suggested" className="text-sm font-medium">
                      Use Suggested by XerpaAI
                    </label>
                  </div>
                  {!useSuggested && (
                    <div className="flex-1 max-w-sm">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search competitors..."
                          value={competitorSearch}
                          onChange={(e) => setCompetitorSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {useSuggested ? (
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-primary font-medium mb-2">XerpaAI Suggested Competitors:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableCompetitors
                        .filter((comp) => comp.suggested)
                        .map((comp) => (
                          <Badge key={comp.id} variant="outline" className="border-primary text-primary">
                            {comp.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {filteredCompetitors.map((comp) => (
                      <div key={comp.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={comp.id}
                          checked={selectedCompetitors.includes(comp.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCompetitors((prev) => [...prev, comp.id].slice(0, 5))
                            } else {
                              setSelectedCompetitors((prev) => prev.filter((id) => id !== comp.id))
                            }
                          }}
                          disabled={!selectedCompetitors.includes(comp.id) && selectedCompetitors.length >= 5}
                        />
                        <label htmlFor={comp.id} className="text-sm">
                          {comp.name}
                          {comp.suggested && <span className="text-primary ml-1">★</span>}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  {useSuggested
                    ? "Using AI-recommended competitors for optimal benchmarking"
                    : `${selectedCompetitors.length}/5 competitors selected`}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Xerpa Index Chart
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Track your Xerpa Index performance against selected competitors over time
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                {console.log("[v0] Rendering Xerpa Index Chart")}
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={["dataMin - 20", "dataMax + 20"]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      labelStyle={{ color: "#374151", fontWeight: "600" }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
                    <Line
                      type="monotone"
                      dataKey="xerpa"
                      stroke="#15803d"
                      strokeWidth={3}
                      name="XerpaAI"
                      dot={{ fill: "#15803d", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#15803d", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="competitor1"
                      stroke="#84cc16"
                      strokeWidth={2}
                      name="Competitor A"
                      dot={{ fill: "#84cc16", strokeWidth: 2, r: 3 }}
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="competitor2"
                      stroke="#6b7280"
                      strokeWidth={2}
                      name="Competitor B"
                      dot={{ fill: "#6b7280", strokeWidth: 2, r: 3 }}
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="competitor3"
                      stroke="#9ca3af"
                      strokeWidth={2}
                      name="Competitor C"
                      dot={{ fill: "#9ca3af", strokeWidth: 2, r: 3 }}
                      strokeDasharray="5 5"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-green-700 rounded"></div>
                  <span className="text-muted-foreground">XerpaAI: 847</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-lime-500 rounded border-dashed border"></div>
                  <span className="text-muted-foreground">Competitor A: 730</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-gray-500 rounded border-dashed border"></div>
                  <span className="text-muted-foreground">Competitor B: 755</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-gray-400 rounded border-dashed border"></div>
                  <span className="text-muted-foreground">Competitor C: 740</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Reference - Sentiment Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Analyze sentiment trends across your content and competitor mentions
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Sentiment Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Positive</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-green-500"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Neutral</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-1/5 h-full bg-gray-400"></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Negative</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-1/20 h-full bg-red-500"></div>
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Recent Sentiment Highlights</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-800">Positive Mention</span>
                      </div>
                      <p className="text-sm text-green-900">
                        "XerpaAI's latest campaign shows impressive engagement rates"
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium text-blue-800">Neutral Mention</span>
                      </div>
                      <p className="text-sm text-blue-900">"Industry analysis shows mixed results across platforms"</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Top Performing Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(showAllPosts ? topPosts.slice(0, 50) : topPosts.slice(0, 3)).map((post, index) => (
                    <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                      <ImageIcon
                        src={post.thumbnail || "/placeholder.svg"}
                        alt="Post thumbnail"
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{post.platform}</span>
                          <span>{post.engagement} engagement</span>
                          <Badge variant="outline" className="text-xs">
                            Score: {post.influenceScore}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-16 h-8 flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={post.sparklineData}>
                            <Line type="monotone" dataKey="value" stroke="#15803d" strokeWidth={2} dot={false} />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                  {topPosts.length > 3 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAllPosts(!showAllPosts)}
                      className="w-full mt-2"
                    >
                      {showAllPosts ? "Show Top 3" : `View All ${Math.min(topPosts.length, 50)} Posts`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Top Performing KOLs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(showAllKOLs ? topKOLs.slice(0, 50) : topKOLs.slice(0, 3)).map((kol, index) => (
                      <div key={kol.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-700 to-green-800 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{kol.name}</h4>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{kol.engagement} engagement</span>
                            <span>{kol.reach} reach</span>
                            <span>{kol.posts} posts</span>
                          </div>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">Score: {kol.score}</Badge>
                      </div>
                    ))}
                    {topKOLs.length > 3 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAllKOLs(!showAllKOLs)}
                        className="w-full mt-2"
                      >
                        {showAllKOLs ? "Show Top 3" : `View All ${Math.min(topKOLs.length, 50)} KOLs`}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Top Earning KOLs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topKOLs.slice(0, 3).map((kol, index) => (
                      <div key={`earning-${kol.name}`} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{kol.name}</h4>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>${(Math.random() * 5000 + 1000).toFixed(0)} earned</span>
                            <span>{kol.engagement} engagement</span>
                            <span>{kol.posts} posts</span>
                          </div>
                        </div>
                        <Badge className="bg-green-600 text-white text-xs">
                          ${(Math.random() * 50 + 10).toFixed(2)}/post
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Efficiency: Cost per Influence Point
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor your campaign efficiency and cost optimization over time
              </p>
              <div className="flex items-center gap-4 mt-2">
                <Select value={efficiencyMetric} onValueChange={setEfficiencyMetric}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indexPerExpense">Cost per Influence Point</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Checkbox id="expense-overlay" checked={showExpenseOverlay} onCheckedChange={setShowExpenseOverlay} />
                  <label htmlFor="expense-overlay" className="text-sm">
                    Show expense trend
                  </label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <h4 className="font-medium text-sm text-muted-foreground">Live Metrics</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-background rounded-lg border">
                        <div className="text-xs text-muted-foreground mb-1">Total Budget</div>
                        <div className="text-xl font-bold text-primary">
                          ${efficiencyMetrics.totalBudget.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-600 mt-1">Allocated for Q1 2024</div>
                      </div>
                      <div className="p-3 bg-background rounded-lg border">
                        <div className="text-xs text-muted-foreground mb-1">Current Expense</div>
                        <div className="text-xl font-bold text-secondary">
                          ${efficiencyMetrics.currentExpense.toLocaleString()}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          {((efficiencyMetrics.currentExpense / efficiencyMetrics.totalBudget) * 100).toFixed(1)}% of
                          budget used
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="h-80 w-full">
                    {console.log("[v0] Rendering Efficiency Chart")}
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={efficiencyTimeSeriesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                        <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="efficiency" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        {showExpenseOverlay && (
                          <YAxis
                            yAxisId="expense"
                            orientation="right"
                            stroke="#f59e0b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                        )}
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value: any, name: string) => {
                            if (name === "rawExpense") return [`$${value.toLocaleString()}`, "Raw Expense"]
                            return [value.toFixed(3), "Cost per Influence Point"]
                          }}
                          labelStyle={{ color: "#374151", fontWeight: "600" }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                        <Line
                          yAxisId="efficiency"
                          type="monotone"
                          dataKey={efficiencyMetric}
                          stroke="#15803d"
                          strokeWidth={3}
                          name="XerpaAI Efficiency"
                          dot={{ fill: "#15803d", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: "#15803d", strokeWidth: 2 }}
                        />
                        {showExpenseOverlay && (
                          <Line
                            yAxisId="expense"
                            type="monotone"
                            dataKey="rawExpense"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Raw Expense"
                            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
                          />
                        )}
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Efficiency Insight:</strong> Lower values indicate better efficiency in growing influence
                      relative to spending. Current trend shows improving efficiency over the past month with a 23%
                      reduction in cost per influence point.
                      {showExpenseOverlay &&
                        " The dashed orange line shows raw expense trends, helping identify spending patterns."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Insights & Recommendations
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                AI-powered analysis and actionable recommendations for your influence growth strategy
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiInsights.map((insight) => (
                  <Card key={insight.id} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${insight.color}`}>
                            <insight.icon className="w-4 h-4 text-white" />
                          </div>
                          <CardTitle className="text-sm">{insight.category}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleInsight(insight.id)}
                          className="h-6 w-6 p-0"
                        >
                          {expandedInsights.includes(insight.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-2">{insight.summary}</p>
                      {expandedInsights.includes(insight.id) && (
                        <div className="space-y-3 mt-3 pt-3 border-t border-border">
                          <div>
                            <h5 className="text-xs font-medium text-muted-foreground mb-1">DETAILED ANALYSIS</h5>
                            <p className="text-sm">{insight.details}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-muted-foreground mb-1">RECOMMENDED ACTIONS</h5>
                            <ul className="text-sm space-y-1">
                              {insight.actions.map((action, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                            <span>Impact: {insight.impact}</span>
                            <span>Timeline: {insight.timeline}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
