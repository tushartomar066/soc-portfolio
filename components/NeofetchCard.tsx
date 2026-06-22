import { KaliTerminal } from "@/components/KaliTerminal";

// Kali "dragon" style ASCII art (compact, terminal-safe).
const DRAGON = String.raw`
        ..,,;;;::cccccc:;;,,..
     .,;cccccccccccccccccccccc;,.
   .;cccccccccccccccccccccccccccc;.
  ,ccccccccccccccc;'    ';ccccccccc,
 ;cccccccccccc;.            .;cccccc;
.ccccccccc;.                   .;cccc.
,ccccc;.        .,,,,,.          .;cc,
ccc;.        .;cccccccccc;.        .;c
c;.        .;ccccccccccccccc;.      .'
'         ;cccccccccccccccccc;
        .ccccccccccccccccccccc.
        ;ccccccccccccccccccccc;
        'ccccccccccccccccccccc'
         ';ccccccccccccccccc;'
           ':ccccccccccccc:'
              '::cccccc::'
`;

const INFO: [string, string][] = [
  ["OS", "SOC Operations (Junior Build)"],
  ["Host", "FICO Security Operations"],
  ["Kernel", "BlueTeam 5.15.0-defender"],
  ["Uptime", "Since June 2025"],
  ["Role", "SOC Analyst Intern"],
  ["Packages", "Splunk, Defender, Wiz (learning)"],
  ["Shell", "alert-triage"],
  ["Resolution", "1920x1080 (Threat View)"],
  ["DE", "MITRE ATT&CK Framework"],
  ["WM", "Blue Team Operations"],
  ["Terminal", "SOC-Dashboard"],
  ["CPU", "Curiosity + Caffeine"],
  ["Memory", "100% focused on learning"],
];

/**
 * Kali "neofetch" card — dragon ASCII art (purple) beside the SOC system
 * info table. Pure presentational component.
 */
export function NeofetchCard() {
  return (
    <KaliTerminal title="tushar@kali: ~/neofetch" bodyClassName="overflow-x-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <pre className="hidden shrink-0 whitespace-pre text-[6px] leading-[1.1] text-accent-purple sm:block sm:text-[7px]">
          {DRAGON}
        </pre>
        <div className="min-w-0 text-xs leading-relaxed sm:text-sm">
          <p className="text-accent-red">
            tushar<span className="text-text-secondary">@</span>
            <span className="text-accent-blue">kali</span>
          </p>
          <p className="text-text-secondary">───────────</p>
          {INFO.map(([k, v]) => (
            <p key={k} className="text-text-primary">
              <span className="text-accent-purple">{k}</span>
              <span className="text-text-secondary">: </span>
              {v}
            </p>
          ))}
        </div>
      </div>
    </KaliTerminal>
  );
}
