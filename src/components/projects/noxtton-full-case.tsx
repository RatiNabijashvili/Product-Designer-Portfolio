import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { ExploreMoreWork } from '@/components/projects/hapttic-project-page';
import { UxChallengesAnimations as ProjectPageAnimations } from '@/components/projects/ux-challenges-animations';
import { NoxttonCaseSection, NoxttonIntroduction, NoxttonChallenge, NoxttonRole, NoxttonOutcome, NoxttonReflection } from '@/components/projects/noxtton-case-sections';

function Visual({ file, alt, width = 2400, height = 1350, original = false }: { file: string; alt: string; width?: number; height?: number; original?: boolean }) {
  return <Image data-challenge-visual src={`/Projects/Noxtton-Wallet/${file} Image${original ? '' : ' Full Case'}.webp`} alt={alt} width={width} height={height} sizes={width < 2400 ? '(max-width: 767px) 100vw, 42vw' : '(max-width: 767px) 100vw, 84vw'} unoptimized className="mt-8 h-auto w-full rounded-lg md:mt-12" />;
}

function Chapter({ children }: { children: React.ReactNode }) {
  return <h2 data-challenge-title className="mb-16 mt-16 text-center font-headline text-4xl uppercase leading-[1.5] text-[#DCDCDC] md:mb-24 md:mt-24 md:text-[72px] md:leading-[1.2]">{children}</h2>;
}

function Notes({ children }: { children: React.ReactNode }) {
  return <div data-challenge-visual className="mt-6 space-y-4 text-base font-medium leading-[1.5] text-[#919191] md:text-xl">{children}</div>;
}

export function NoxttonFullCase() {
  return <ProjectPageAnimations>
    <header className="px-4 pt-8 sm:px-8"><nav aria-label="Primary navigation" className="flex items-center justify-between">
      <Link href="/" aria-label="Rati Nabijashvili — Home"><Image src="/Logos/Logo.svg" alt="Rati Nabijashvili" width={153} height={35} className="h-8 w-auto" loading="eager" /></Link>
      <a href="mailto:r.nabijashvili@gmail.com" className="flex h-12 w-32 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground sm:h-14 sm:w-40 sm:text-xl">Contact Me</a>
    </nav></header>
    <main>
      <div data-project-heading className="mb-12 mt-16 flex flex-col gap-4 px-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold uppercase leading-[1.5] md:text-[32px] md:leading-[1.2]">Noxtton Wallet</h1>
        <div className="flex flex-wrap gap-3">{['Fintech', 'B2C', 'Mobile App'].map(tag => <span key={tag} className="flex h-10 items-center rounded-full border border-[#706F6F] px-3 text-sm font-bold text-[#706F6F]">{tag}</span>)}</div>
      </div>
      <div data-project-hero className="aspect-[1440/811] w-full overflow-hidden bg-[#E4E4E4]"><video autoPlay muted playsInline loop preload="auto" poster="/Projects/Noxtton-Wallet/First Image.webp" className="block h-full w-full object-cover"><source src="/Projects/Noxtton-Wallet/Noxxton-Video.webm" type="video/webm" />Your browser does not support the video tag.</video></div>
      <div className="mx-auto w-full max-w-[2464px] px-4 sm:px-8 md:w-5/6 md:px-0">
        <NoxttonIntroduction />
        <Visual file="First" original width={2752} height={1280} alt="Noxtton Wallet balance, home and transfer review screens" />
        <NoxttonChallenge />
        <NoxttonRole />
        <Visual file="Second" alt="Noxtton splash screen and wallet creation concept" />

        <Chapter>Introducing the wallet before the setup</Chapter>
        <NoxttonCaseSection title="Progressive onboarding">
          <p>The proposed experience created a wallet automatically when the app opened, bringing users directly to a home screen with Receive, Send and Activity.</p>
          <p>Recovery-phrase backup and App Lock were introduced through non-blocking reminders after the wallet became accessible. Optional coach marks explained core functions within the interface.</p>
          <p>The intention was to give users context for the setup tasks: first understand what the wallet does, then learn how to protect access to it.</p>
        </NoxttonCaseSection>
        <Visual file="Third" alt="Progressive onboarding with an optional tour of the wallet balance and navigation" />
        <NoxttonCaseSection title="Security after onboarding">
          <p>To balance immediate access with security setup, I placed a “Protect Your Wallet” card on the home screen. It brought two actions into the main experience: backing up the recovery phrase and enabling App Lock.</p>
          <p>Instead of requiring users to complete both during onboarding, the card provided direct entry points once they reached the wallet. Completing each step also earned tickets, connecting the rewards concept to protective actions.</p>
          <p>The trade-off remained: the reminder was dismissible, so users could continue without completing setup. Before implementation, I would test whether users noticed the card, understood the difference between backup and App Lock and completed these actions before receiving funds.</p>
        </NoxttonCaseSection>
        <Visual file="Fourth" height={990} alt="Protect Your Wallet card with prominent placement, direct setup actions and completion incentives" />

        <Chapter>Making the send decision explicit</Chapter>
        <NoxttonCaseSection title="A guided transfer flow">
          <p>I divided sending into logical steps so users could focus on one decision at a time.</p>
          <p>The review stage brought together the information needed before authorizing a transfer:</p>
          <ul className="list-disc space-y-1 pl-6 font-bold text-[#474747]">{['Recipient address.', 'Selected network.', 'Asset and amount.', 'Transaction fee.', 'A clear explanation of the consequences of confirming.'].map(item => <li key={item}>{item}</li>)}</ul>
          <p>The intention was to make the review screen a meaningful decision point rather than a final button users passed through automatically.</p>
        </NoxttonCaseSection>
        <div className="grid gap-4 md:grid-cols-2"><Visual file="Fifth" width={1184} height={888} alt="Send flow: choose an asset, enter the recipient and specify the amount" /><Visual file="Sixth" width={1184} height={888} alt="Send flow: review transfer details, authenticate and see confirmation" /></div>
        <NoxttonCaseSection title="Guardian Mode">
          <p>Guardian Mode was the proposed safety-check layer within the sending experience.</p>
          <p>Its design included address validation, network-related warnings, unknown-token warnings, fee information and an additional confirmation step.</p>
          <p>These checks had different purposes. Address validation could identify formatting problems, it could not establish that a recipient was trustworthy. Network warnings would also require technical rules and supporting information.</p>
        </NoxttonCaseSection>
        <Visual file="Seventh" height={752} alt="Guardian Mode messages for an invalid address, a valid address and a different network" />
        <Notes><p>The technical feasibility and coverage of these checks remained unverified. The interface proposed how warnings would be communicated; it did not demonstrate that every risky transfer could be detected.</p></Notes>
        <NoxttonCaseSection title="Clearer receiving instructions">
          <p>The Receive experience made the wallet address and QR code readily available, with copy and share actions.</p>
          <p>Because newcomers might not understand how addresses relate to networks, the selected network needed to be explicit wherever receiving details were displayed.</p>
        </NoxttonCaseSection>
        <Visual file="Eight" alt="Receiving funds with a network-specific QR code, full wallet address and copy confirmation" />

        <Chapter>Explaining what happened next</Chapter>
        <NoxttonCaseSection title="Transaction activity">
          <p>The Activity section combined incoming and outgoing transfers in one history.</p>
          <p>Each transaction presented its direction, asset, amount, status, time and counterparty. This gave users a place to check what happened after leaving the sending flow.</p>
        </NoxttonCaseSection>
        <Visual file="Nineth" alt="Transaction history distinguishes pending, sent, failed and received transfers" />
        <Notes><p>The status model was an important part of the proposed experience. A submitted transaction should not look identical to a confirmed one.</p><p>Before implementation, pending, confirmed and failed states would need to be checked against actual network behavior and tested for comprehension.</p></Notes>
        <NoxttonCaseSection title="Education in context">
          <p>Optional coach marks introduced key functions where users encountered them.</p>
          <p>Rather than explaining every concept during onboarding, the proposed experience distributed guidance across relevant moments: recovery during backup, addresses during receiving and fees during sending.</p>
          <p>The intention was to make explanations relevant to the task immediately in front of the user.</p>
        </NoxttonCaseSection>
        <Visual file="Tenth" alt="Contextual transaction guidance explains status, network information and timestamps" />
        <NoxttonCaseSection title="Optional rewards">
          <p>I also designed Pro-of-Trust Rewards, an opt-in experience awarding tickets and points for activities such as sending and receiving.</p>
          <p>This introduced a tension with the newcomer-focused direction. Rewarding transfers could encourage unnecessary activity before users fully understood the costs or consequences.</p>
          <p>I would validate that model before taking it forward and explore whether learning and protective setup were more appropriate behaviors to recognize.</p>
        </NoxttonCaseSection>
        <Visual file="Eleventh" alt="Optional rewards concept with membership tiers, points, perks and explanatory guidance" />
        <NoxttonOutcome />
        <NoxttonReflection />
        <ExploreMoreWork currentProjectId="noxtton-wallet" />
      </div>
    </main>
    <div className="[&>footer]:!mt-16"><Footer showHomeLink /></div>
  </ProjectPageAnimations>;
}
