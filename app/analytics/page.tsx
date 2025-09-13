import dynamic from 'next/dynamic'

const AnalyticsHubPage = dynamic(() => import('@/components/analytics-hub'), {
  ssr: false
})

export default AnalyticsHubPage
