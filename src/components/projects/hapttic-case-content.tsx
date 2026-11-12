import { HaptticOverviewGallery } from '@/components/projects/hapttic-overview-gallery';
import { ProjectImage as Image } from '@/components/shared/project-image';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { ExploreMoreWork } from '@/components/projects/hapttic-project-page';
import { UxChallengesAnimations } from '@/components/projects/ux-challenges-animations';
import { NoxttonCaseSection as Section } from '@/components/projects/noxtton-case-sections';

function AssetIcon({ name, className }: { name: string; className?: string }) {
  return <Image src={`/${name}.svg`} alt="" aria-hidden="true" width={24} height={24} className={className} />;
}

function Visual({ file, alt, width = 2400, height = 1350 }: { file: string; alt: string; width?: number; height?: number }) {
  return <Image loading={file === 'First' ? 'eager' : 'lazy'} data-challenge-visual src={`/Projects/Happtic/${file} Image Full Case.webp`} alt={alt} width={width} height={height} sizes={width < 2400 ? '(max-width: 767px) 100vw, 42vw' : '(max-width: 767px) 100vw, 84vw'} unoptimized className="mt-8 h-auto w-full rounded-lg md:mt-12" />;
}

function Chapter({ children }: { children: React.ReactNode }) {
  return <h2 data-challenge-title className="mb-16 mt-16 text-center font-headline text-4xl uppercase leading-[1.5] text-[#DCDCDC] md:mb-24 md:mt-24 md:text-[72px] md:leading-[1.2]">{children}</h2>;
}

function ComparisonStep({ file, title, reverse = false, children }: { file: string; title: string; reverse?: boolean; children: React.ReactNode }) {
  return <div data-comparison-step className="mt-8 grid items-center gap-6 md:grid-cols-2 md:gap-8">
    <div className={reverse ? 'order-2' : 'order-2 md:order-1'}>
      <Image src={`/Projects/Happtic/${file} Image Full Case.webp`} alt={title} width={1176} height={882} sizes="(max-width: 767px) 100vw, 42vw" unoptimized className="h-auto w-full rounded-lg" />
    </div>
    <div className={`order-1 space-y-2 md:space-y-3 ${reverse ? '' : 'md:order-2'}`}>
      <h3 className="text-xl font-bold uppercase">{title}</h3>
      <div className="space-y-2 text-base font-medium leading-[1.5] text-[#919191] md:text-xl">{children}</div>
    </div>
  </div>;
}

function Points({ items, questions = false, numbered = false }: { items: string[]; questions?: boolean; numbered?: boolean }) {
  return <ul className={"grid auto-rows-fr gap-3 text-[#030C0C] md:auto-rows-auto"}>{items.map((item, index) => <li key={item} className={`flex gap-3 rounded-lg border border-[#DCDCDC] p-4 font-bold ${questions ? "min-h-[82px] items-center md:min-h-0" : "items-center"}`}>{questions && <AssetIcon name="circle-questionmark" className="h-6 w-6 shrink-0" />}{numbered && <span>{index + 1}.</span>}<span>{item}</span></li>)}</ul>;
}

function Callout({ children, icon = 'trophy-dark' }: { children: React.ReactNode; icon?: 'trophy-dark' | 'compass' | 'circle-questionmark' }) {
  return <div data-challenge-result className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-[#DCDCDC] p-6 text-center text-base font-bold leading-[1.5] text-[#030C0C] md:p-8 md:text-xl"><AssetIcon name={icon} className="h-6 w-6" /><div className="max-w-4xl">{children}</div></div>;
}

function Introduction() {
  const overview = [['Role', 'Product Designer'], ['Timeline', 'Four weeks'], ['Market', 'Global'], ['Status', 'Shipped'], ['Industry', 'MarTech'], ['Team', 'Product Manager, Product Owner, Developers']];
  return <Section title="Designing analytics for marketers">
    <p>Hapttic is a brand-monitoring platform that helps marketing teams track online mentions, sentiment, campaigns and customer conversations.</p>
    <p>The platform allowed marketers to monitor individual campaigns and manage conversations, but it did not support cross-campaign comparison or inbox-level analytics.</p>
    <p>Over four weeks, I designed two new capabilities for Hapttic: Compare Campaigns and Inbox Analysis. Both shipped, as did the redesigned marketing website. I also designed a proposed free-to-paid experience for Inbox Analysis.</p>
    <dl className="!mt-8 grid overflow-hidden rounded-lg border border-[#DCDCDC] sm:grid-cols-2 lg:grid-cols-3">{overview.map(([label, value], index) => <div key={label} className={[
      'flex flex-col items-center justify-center gap-1.5 p-8 text-center md:min-h-40',
      index < 5 && 'border-b', index >= 4 && 'sm:border-b-0', index % 2 === 0 && 'sm:border-r', index % 3 === 2 && 'lg:border-r-0', index % 3 !== 2 && 'lg:border-r', index < 3 && 'lg:border-b', index >= 3 && 'lg:border-b-0',
    ].filter(Boolean).join(' ')}><dt className="text-base font-medium leading-[1.2] md:text-xl">{label}</dt><dd className="text-xl font-bold leading-[1.4] text-[#030C0C] md:text-2xl">{value}</dd></div>)}</dl>
  </Section>;
}

function Usage() {
  return <Section title="Post-launch usage"><Points items={['1,100 active users had used Compare Campaigns.', '4-5 campaigns were compared on average.', '75 accounts were using Inbox Analysis at the time of reporting.']} /><p className="flex items-start gap-2"><AssetIcon name="circle-info" className="h-6 w-6 shrink-0 md:mt-0.5" />Based on Hapttic internal reporting, November 2025. Figures are rounded.</p></Section>;
}

function Role() {
  const items = [
    ['arrow-right-left', 'Compare Campaigns and its dashboard widget'], ['inbox', 'Inbox Analysis'],
    ['chart-2', 'Message-volume trends'], ['clock', 'Response-time analytics'],
    ['people-added', 'Operator performance'], ['bookmark', 'Conversation categorization'],
    ['sparkles-three', 'AI-generated Smart Insights'], ['dollar', 'Proposed free-to-paid experience'],
    ['bubble-annotation-2', 'Product microcopy and upgrade messaging'], ['window', 'Website structure, storytelling and interface design'],
  ] as const;
  return <Section title="My role"><p>I owned the product design of:</p><ul className="grid auto-rows-fr gap-3 md:auto-rows-auto md:grid-cols-2">{items.map(([icon, label]) => <li key={label} className="flex min-h-[82px] items-center gap-3 rounded-lg border border-[#DCDCDC] p-4 font-bold text-[#030C0C] md:min-h-0"><AssetIcon name={icon} className="h-6 w-6 shrink-0" /><span>{label}</span></li>)}</ul><p>I collaborated with the PM and Product Owner on requirements and priorities and with developers on feasibility and implementation. The features and redesigned website were shipped.</p></Section>;
}

function Outcome() {
  return <Section title="Overall outcome"><p>The project introduced two new analytical capabilities to Hapttic.</p><p>Compare Campaigns gave marketers their first dedicated way to evaluate multiple campaigns in one place. Inbox Analysis added a new intelligence layer above individual conversations by combining message volume, response time, operator performance, conversation categorization and Smart Insights.</p><p>I designed a proposed subscription model for Inbox Analysis. Free accounts would be able to analyze one connected page, while paid accounts would be able to analyze unlimited pages together.</p><p>The redesigned website brought these additions together through a clearer product narrative and visual direction.</p></Section>;
}

function Reflection() {
  return <Section title="Reflection"><p>Some customers used Compare Campaigns directly in client reports. That showed me two jobs the same view needed to support: helping marketers spot a difference and helping them explain it to someone else.</p><p>Stakeholder input helped me understand what customers were asking for and post-launch data showed what they used. Without direct user research, I still didn’t know how marketers interpreted the charts or what evidence teams needed before acting on a Smart Insight.</p><p>If I continued the work, I’d test two questions.</p><Points questions items={['How do marketers use charts and exact values when preparing a campaign report?', 'What evidence do teams need before acting on a Smart Insight?']} /><p>The project reinforced an important principle:</p><Callout icon="compass">Adding more analytics does not automatically create more understanding. The value comes from organizing data around the decisions users need to make.</Callout></Section>;
}

function Opportunity() {
  return <Section title="The opportunity"><p>Hapttic already collected valuable campaign and conversation data, but two requested capabilities were not yet part of the product.</p><p>Marketers could inspect campaigns individually, but there was no way to compare their performance in one place. The inbox supported day-to-day conversation management, but it did not provide analytics for message volume, response time, operator performance, or recurring topics.</p><p>The challenge was therefore not to improve existing analytics screens. It was to define how these entirely new capabilities should work, where they should live in the product, and how their data could remain understandable as complexity increased.</p><p>At the same time, the website needed to communicate Hapttic’s expanded product offering and give the company a clearer visual and narrative direction.</p><p>This led to the central design question:</p><Callout icon="circle-questionmark">How might we introduce advanced analytics without making Hapttic feel more complex to use?</Callout></Section>;
}

function FullStory() {
  return <>
    <Section title="Designing with limited research"><p>The requests for campaign comparison and inbox analytics came from customer needs reported by stakeholders. Because of the four-week timeline, I did not conduct direct interviews with those customers.</p><p>Rather than treating each request as a fully defined solution, I translated the available information into design hypotheses:</p><ul className="list-disc space-y-1 pl-6 font-bold text-[#474747]"><li>Side-by-side metrics could make campaign differences easier to recognize.</li><li>Aggregated inbox data could reveal performance and workload patterns.</li><li>Prioritized insights could help teams identify what required attention.</li><li>A limited free experience could demonstrate value before asking users to upgrade.</li></ul><p>I combined stakeholder input, business requirements and an analysis of Hapttic’s existing data and product architecture. The resulting designs were validated through feasibility discussions with the product and development teams, with post-launch analytics used to evaluate adoption and repeat usage.</p><p>This approach had an important limitation: stakeholder knowledge could indicate what customers requested, but it could not fully explain how users currently performed each task or why specific behaviors occurred.</p></Section>
    <Visual file="Second" height={1000} alt="Stakeholder input, product review and business requirements inform design hypotheses, the shipped product and post-launch analytics" />
    <Section title="Defining the first release"><p>With four weeks available, I focused on three connected jobs:</p><Points numbered items={['Compare campaign performance in one place', 'Turn inbox activity into measurable performance patterns', 'Surface prioritized insights that help teams identify what needs attention']} /><p>The first release expanded Hapttic’s analytics capabilities while preserving the existing product architecture.</p></Section>
    <Chapter>Introducing cross-campaign comparison</Chapter>
    <Section title="The comparison gap"><p>Hapttic displayed campaign performance individually, but offered no dedicated comparison experience. To understand which campaign performed better, marketers had to open campaigns separately and manually reconcile differences across mentions, sources and sentiment.</p><p>I needed to define:</p><Points questions items={['Where comparison should begin', 'How campaigns should be selected and removed', 'Which metrics should be comparable', 'How exact values and visual patterns should coexist', 'How the interface should behave as more campaigns were added']} /></Section>
    <Section title="Tables or charts?"><p>Because Compare Campaigns was a new capability, I explored two information models: a table optimized for precise lookup and a chart optimized for rapid comparison.</p><p>I evaluated both directions against three requirements:</p><ul className="list-disc space-y-1 pl-6 font-bold text-[#474747]"><li>Make performance differences easy to recognize.</li><li>Preserve access to exact values.</li><li>Remain understandable as campaigns and metrics increase.</li></ul></Section>
    <ComparisonStep file="Third" title="Table-based comparison"><p>The table made exact values immediately available and worked well for detailed lookup.</p><p>However, it became harder to scan as campaigns and metric rows increased. Recognizing the strongest and weakest results required reading across columns and mentally comparing individual values. Totals, channels and sentiment also received similar visual weight, weakening the information hierarchy.</p></ComparisonStep>
    <ComparisonStep file="Fourth" title="Chart-based comparison" reverse><p>I selected the chart-based direction because the primary task was recognizing relative performance rather than inspecting every value simultaneously.</p><p>Summary cards surfaced total mentions and the highest and lowest-performing campaigns. The bar chart made differences between campaigns easier to recognize, while separate tabs organized mentions, sources and sentiment into focused views. Exact values remained available through tooltips. This direction balanced fast visual comparison with access to detailed data.</p></ComparisonStep>
    <Section title="Detailed comparison"><p>The full comparison view allowed marketers to select campaigns and evaluate them using consistent metrics. Mentions, sources and sentiment were separated into focused tabs. This prevented all dimensions from competing for attention while preserving access to the complete analysis.</p><p>Color and layout remained consistent across the experience so users did not have to relearn how campaigns were represented as they moved between metrics.</p></Section>
    <Visual file="Fifth" alt="Campaign comparison across mentions, sources and sentiment" />
    <Callout>Hapttic reported that users typically returned to Compare Campaigns about once a week, often around reporting cycles. Some customers used the comparison view directly in client reports.</Callout>
    <Chapter>Building Inbox Analysis from the ground up</Chapter>
    <Section title="From conversations to insights"><p>Hapttic’s inbox supported reading and managing individual conversations. It did not provide a consolidated way to understand patterns across those conversations. Inbox Analysis was a new feature, so I needed to determine both what information it should contain and how its different analytical dimensions should work together.</p></Section>
    <Section title="Analytics around decisions"><p>Instead of presenting a collection of unrelated charts, I organized Inbox Analysis around the questions marketers and team leads needed to answer.</p><div className="overflow-hidden rounded-lg border border-[#DCDCDC]"><table className="w-full table-fixed text-left text-sm md:text-base"><thead><tr><th scope="col" className="w-1/2 border-b border-r p-3 font-bold md:p-4 md:text-base">Capability</th><th scope="col" className="border-b p-3 font-bold md:p-4 md:text-base">Question answered</th></tr></thead><tbody className="font-bold text-[#030C0C] md:text-xl md:leading-[1.6]">{[['Message volume', 'When did activity change?'], ['Response time', 'How quickly did the team respond?'], ['Operator performance', 'How was workload distributed?'], ['Conversation categorization', 'What were customers discussing?'], ['Smart Insights', 'What requires attention?']].map(([capability, question]) => <tr key={capability} className="border-b last:border-b-0"><th scope="row" className="border-r p-3 md:p-4">{capability}</th><td className="p-3 md:p-4">{question}</td></tr>)}</tbody></table></div></Section>
    <Visual file="Sixth" height={480} alt="Inbox Analysis added to the product navigation" />
    <div data-challenge-visual className="mt-6 text-base font-medium text-[#919191] md:text-xl"><p>This created a clear progression:</p><ol className="mt-4 flex flex-col items-stretch gap-3 font-bold text-[#030C0C] sm:flex-row sm:items-center">{[['page-search-lines', 'Detect a change'], ['scan-text', 'Understand its context'], ['hammer', 'Decide whether action is needed']].map(([icon, item], index) => <li key={item} className="flex flex-1 flex-col items-center gap-3 sm:flex-row"><span className="flex min-h-14 w-full flex-1 items-center justify-start gap-3 rounded-lg border border-[#DCDCDC] px-3 py-3 sm:justify-center"><AssetIcon name={icon} className="h-6 w-6 shrink-0" />{item}</span>{index < 2 && <><AssetIcon name="arrow-right" className="hidden h-6 w-6 shrink-0 sm:block" /><AssetIcon name="arrow-down" className="h-6 w-6 shrink-0 sm:hidden" /></>}</li>)}</ol></div>
    <Section title="Message-volume trends"><p>The volume view showed how conversation activity changed over time.</p><p>Instead of displaying only a total number, the chart helped teams recognize:</p><div className="grid auto-rows-fr gap-3 md:grid-cols-2">{[['statistics', 'Peaks and drops'], ['arrows-repeat-circle', 'Recurring patterns'], ['arrow-right-left', 'Differences between connected pages'], ['calendar-days', 'Changes across selected date ranges']].map(([icon, item]) => <div key={item} className="flex items-center gap-3 rounded-lg border border-[#DCDCDC] p-4 font-bold text-[#030C0C]"><AssetIcon name={icon} className="h-6 w-6 shrink-0" />{item}</div>)}</div></Section>
    <Visual file="Seventh" alt="Message-volume trends with daily, weekly and monthly comparisons" />
    <Section title="Response time and performance"><p>Response-time data can be misleading when shown without operational context. A slow response may indicate a performance problem, but it may also reflect an unusually high workload. I designed the analysis to present response time alongside message volume and operator activity. This gave managers more context before drawing conclusions from an isolated metric.</p></Section>
    <Visual file="Eight" alt="Operator performance breakdown with message totals and sentiment by operator" />
    <Section title="Conversation categorization"><p>Conversation categorization helped teams identify recurring subjects without reviewing every message individually. Categories provided a high-level view of what customers were discussing, while access to the underlying conversations allowed users to inspect the evidence behind each pattern.</p></Section>
    <Visual file="Ninth" alt="Conversation categorization by platform, sales, support and topic" />
    <Section title="Highlighting patterns with Smart Insights"><p>Inbox Analysis contained several analytical views, but users would still need to interpret the charts and decide which patterns deserved attention.</p><p>I designed the Smart Insights widget to bring the most important observations into one scannable area. Instead of requiring users to inspect every chart first, the widget summarized notable changes and connected them to a possible action.</p><p>Each insight combined:</p><ul className="list-disc space-y-1 pl-6 font-bold text-[#474747]"><li>A clear observation.</li><li>Supporting evidence.</li><li>An indication of importance.</li><li>A suggested action.</li></ul></Section>
    <Visual file="Tenth" alt="Smart Insights highlight delayed replies, faster responses, stable performance and peak hours" />
    <Callout>Accounts connected 2-3 pages on average. Message Volume was the most-used section, followed by Categorization and Smart Insights.</Callout>
    <Chapter>Designing the path from free value to paid scale</Chapter>
    <Section title="Balancing free and paid"><p>I wanted teams to try Inbox Analysis before deciding whether to upgrade. I proposed a tiered model that gave free accounts useful analysis for one page and gave paid accounts a way to analyze all their pages together.</p><p>To balance accessibility with premium value, I designed a tiered model:</p><div className="grid auto-rows-fr gap-4 md:grid-cols-2"><div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-[#DCDCDC] p-6 text-center font-bold text-[#030C0C]"><AssetIcon name="people" className="h-6 w-6" /><span>Free accounts would be able to connect and<br className="hidden md:block" /><span className="md:hidden"> </span>analyze one page.</span></div><div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-[#DCDCDC] p-6 text-center font-bold text-[#030C0C]"><AssetIcon name="banknote-2" className="h-6 w-6" />Paid accounts would be able to connect unlimited pages and analyze performance across them.</div></div></Section>
    <Visual file="Eleventh" height={1002} alt="Proposed free-to-paid journey: connect one page, receive analysis, add another page, upgrade and analyze all pages" />
    <Callout>I designed the one-page free limit and contextual upgrade prompt. The limit was not live as a paid gate at the time of reporting.</Callout>
    <Chapter>Communicating the expanded product on the website</Chapter>
    <Section title="One clear product story"><p>Alongside the new product features, I redesigned Hapttic’s website with a clearer story and a new visual direction. The previous site presented individual features without explaining how they worked together to help marketers understand performance.</p><p>I reorganized the content around a simple progression: monitor conversations, compare campaigns, understand patterns and act on insights. Product screenshots demonstrated these capabilities, while the updated visual style and clearer calls to action carried the story through the page.</p></Section>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="min-w-0"><Visual file="Twelfth" width={1184} height={888} alt="Before: Hapttic’s previous marketing website" /></div>
      <div className="min-w-0"><Visual file="Thirteenth" width={1184} height={888} alt="After: redesigned Hapttic website presenting brand health management" /></div>
    </div>
    <Callout>Hapttic’s sales team reported that prospects arrived at demos already familiar with the six modules and asked about specific ones.</Callout>
  </>;
}

export function HaptticCaseContent({ full = false }: { full?: boolean }) {
  return <UxChallengesAnimations>
    <header className="px-4 pt-8 sm:px-8"><nav aria-label="Primary navigation" className="flex items-center justify-between"><Link href="/" aria-label="Rati Nabijashvili — Home"><Image src="/Logos/Logo.svg" alt="Rati Nabijashvili" width={153} height={35} className="h-8 w-auto" loading="eager" /></Link><a href="mailto:r.nabijashvili@gmail.com" className="flex h-12 w-32 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground sm:h-14 sm:w-40 sm:text-xl">Contact Me</a></nav></header>
    <main><div data-project-heading className="mb-12 mt-16 flex flex-col gap-4 px-4 sm:px-8 md:flex-row md:items-center md:justify-between"><h1 className="text-2xl font-bold uppercase leading-[1.5] md:text-[32px] md:leading-[1.2]">Hapttic</h1><div className="flex flex-wrap gap-3">{['SaaS', 'B2B', 'B2C', 'Marketing Page'].map(tag => <span key={tag} className="flex h-10 items-center rounded-full border border-[#706F6F] px-3 text-sm font-bold text-[#706F6F]">{tag}</span>)}</div></div>
      <div data-project-hero className="aspect-[1440/811] w-full overflow-hidden bg-[#E4E4E4]"><video autoPlay muted playsInline loop preload="auto" poster="/Projects/Happtic/First Image.webp" className="block h-full w-full object-cover"><source src="/Projects/Happtic/Happtic-video.webm" type="video/webm" />Your browser does not support the video tag.</video></div>
      <div className="mx-auto w-full max-w-[2464px] px-4 sm:px-8 md:w-5/6 md:px-0"><Introduction />{full && <Visual file="First" alt="Hapttic Inbox Analysis dashboard on a laptop" />}<Usage />{full && <Opportunity />}<Role />{full ? <FullStory /> : <HaptticOverviewGallery />}<Outcome /><Reflection /><ExploreMoreWork currentProjectId="hapttic" /></div>
    </main><div className="[&>footer]:!mt-16"><Footer showHomeLink /></div>
  </UxChallengesAnimations>;
}
