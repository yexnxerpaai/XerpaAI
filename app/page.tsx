"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
  Lightbulb,
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
  Newspaper,
  ExternalLink,
  Heart,
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
  influentialFollowersEngagement: { value: 42, change: -2.1, trend: "down" },
  totalFollowers: { value: 24.7, change: 15.2, trend: "up" },
  totalEngagement: { value: 89500, change: 18.7, trend: "up" },
  engagementRate: { value: 3.5, change: -0.8, trend: "down" },
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
  const [showAllKOLs, setShowAllKOLs] = useState(false)
  const [showAllPosts, setShowAllPosts] = useState(false)
  const [selectedNewsCompetitors, setSelectedNewsCompetitors] = useState<string[]>(["comp-a", "comp-b", "comp-c"])
  const [showInfluentialOnly, setShowInfluentialOnly] = useState(false)

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

  const getFilteredCompetitorNews = () => {
    return newsData.competitor.filter((news) =>
      selectedNewsCompetitors.some((compId) => {
        const competitor = availableCompetitors.find((c) => c.id === compId)
        return competitor && news.competitor.includes(competitor.name.split(" ")[1]) // Match "A", "B", "C" etc.
      }),
    )
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
            <Card className="border-accent/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Influential Followers Engagement
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">{kpiData.influentialFollowersEngagement.value}</div>
                <div className="flex items-center text-xs mt-1">
                  {getTrendIcon(kpiData.influentialFollowersEngagement.trend)}
                  <span className={`ml-1 ${getTrendColor(kpiData.influentialFollowersEngagement.trend)}`}>
                    {kpiData.influentialFollowersEngagement.change > 0 ? "+" : ""}
                    {kpiData.influentialFollowersEngagement.change}% this period
                  </span>
                </div>
              </CardContent>
            </Card>

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
          </div>

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
                  {(showAllPosts ? topPosts : topPosts.slice(0, 3)).map((post, index) => (
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
                      {showAllPosts ? "Show Top 3" : `View All ${topPosts.length} Posts`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Top Performing KOLs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(showAllKOLs ? topKOLs : topKOLs.slice(0, 3)).map((kol, index) => (
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
                      {showAllKOLs ? "Show Top 3" : `View All ${topKOLs.length} KOLs`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
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
                    <SelectItem value="indexPerExpense">Changed Index ÷ Expense</SelectItem>
                    <SelectItem value="followersPerExpense">New Influential Followers ÷ Expense</SelectItem>
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
                      <div className="p-3 bg-background rounded-lg border">
                        <div className="text-xs text-muted-foreground mb-1">Expense ÷ Xerpa Index Change</div>
                        <div className="text-xl font-bold text-accent">
                          {efficiencyMetrics.expenseToIndexRatio.toFixed(1)}
                        </div>
                        <div className="text-xs text-amber-600 mt-1">Lower is better</div>
                      </div>
                      <div className="p-3 bg-background rounded-lg border">
                        <div className="text-xs text-muted-foreground mb-1">Expense ÷ New Followers</div>
                        <div className="text-xl font-bold text-orange-600">
                          ${efficiencyMetrics.expenseToFollowersRatio.toFixed(2)}
                        </div>
                        <div className="text-xs text-orange-600 mt-1">Per new follower</div>
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
                            return [
                              value.toFixed(3),
                              efficiencyMetric === "indexPerExpense"
                                ? "Index/Expense Ratio"
                                : "Followers/Expense Ratio",
                            ]
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
                      <strong>Efficiency Insight:</strong>{" "}
                      {efficiencyMetric === "indexPerExpense"
                        ? "Higher values indicate better efficiency in growing influence relative to spending. Current trend shows improving efficiency over the past month."
                        : "Higher values indicate better efficiency in acquiring influential followers relative to spending. Your cost per follower has improved by 37% since November."}
                      {showExpenseOverlay &&
                        " The dashed orange line shows raw expense trends, helping identify spending patterns."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-600" />
                News Collections
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Latest news and updates from your company, competitors, and industry
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client News */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-green-200">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <h3 className="font-semibold text-green-800">Client News</h3>
                  </div>
                  <div className="space-y-3">
                    {newsData.client.map((news) => (
                      <div key={news.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="text-sm font-medium text-green-900 leading-tight mb-2">{news.headline}</h4>
                        <div className="flex items-center justify-between text-xs text-green-700">
                          <span className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            {news.source}
                          </span>
                          <span>{new Date(news.date).toLocaleDateString()}</span>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs border-green-300 text-green-700">
                          {news.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Competitor News */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-orange-200">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                      <h3 className="font-semibold text-orange-800">Competitor News</h3>
                    </div>
                    <Select
                      value={selectedNewsCompetitors.length === availableCompetitors.length ? "all" : "custom"}
                      onValueChange={(value) => {
                        if (value === "all") {
                          setSelectedNewsCompetitors(availableCompetitors.map((c) => c.id))
                        }
                      }}
                    >
                      <SelectTrigger className="w-24 h-6 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Competitor Selection Checkboxes */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {availableCompetitors.slice(0, 4).map((comp) => (
                      <div key={comp.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`news-${comp.id}`}
                          checked={selectedNewsCompetitors.includes(comp.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedNewsCompetitors((prev) => [...prev, comp.id])
                            } else {
                              setSelectedNewsCompetitors((prev) => prev.filter((id) => id !== comp.id))
                            }
                          }}
                        />
                        <label htmlFor={`news-${comp.id}`} className="text-xs">
                          {comp.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {getFilteredCompetitorNews().map((news) => (
                      <div key={news.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="text-sm font-medium text-orange-900 leading-tight mb-2">{news.headline}</h4>
                        <div className="flex items-center justify-between text-xs text-orange-700">
                          <span className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            {news.source}
                          </span>
                          <span>{new Date(news.date).toLocaleDateString()}</span>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs border-orange-300 text-orange-700">
                          {news.competitor}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industry News */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-purple-200">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <h3 className="font-semibold text-purple-800">Industry News</h3>
                  </div>
                  <div className="space-y-3">
                    {newsData.industry.map((news) => (
                      <div key={news.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="text-sm font-medium text-purple-900 leading-tight mb-2">{news.headline}</h4>
                        <div className="flex items-center justify-between text-xs text-purple-700">
                          <span className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            {news.source}
                          </span>
                          <span>{new Date(news.date).toLocaleDateString()}</span>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs border-purple-300 text-purple-700">
                          {news.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights & Recommendations */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                AI Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight) => {
                  const IconComponent = insight.icon
                  const isExpanded = expandedInsights.includes(insight.id)
                  const colorClasses = {
                    green: "bg-green-50 border-green-200 text-green-800",
                    blue: "bg-blue-50 border-blue-200 text-blue-800",
                    amber: "bg-amber-50 border-amber-200 text-amber-800",
                  }
                  const iconColors = {
                    green: "text-green-600",
                    blue: "text-blue-600",
                    amber: "text-amber-600",
                  }

                  return (
                    <Collapsible key={insight.id} open={isExpanded} onOpenChange={() => toggleInsight(insight.id)}>
                      <div className={`rounded-lg border ${colorClasses[insight.color as keyof typeof colorClasses]}`}>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="w-full p-4 justify-start hover:bg-transparent">
                            <div className="flex items-start gap-3 w-full">
                              <IconComponent
                                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors[insight.color as keyof typeof iconColors]}`}
                              />
                              <div className="flex-1 text-left">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{insight.title}</h4>
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 flex-shrink-0" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-sm mt-1 opacity-80">{insight.summary}</p>
                              </div>
                            </div>
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="px-4 pb-4">
                            <div className="pl-8">
                              <p className="text-sm">{insight.detail}</p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
