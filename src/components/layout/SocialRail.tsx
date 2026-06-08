import { Github, Linkedin, Facebook, Twitter, Mail } from "lucide-react";

const links = [
  { href: "https://github.com/Diini03", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/diinikahiye/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://x.com/DiiniCade0", label: "Twitter", Icon: Twitter },
  { href: "https://www.facebook.com/diiniCade8", label: "Facebook", Icon: Facebook },
  { href: "mailto:diiniyare74@gmail.com", label: "Email", Icon: Mail },
];

export function SocialRail() {
  return (
    <aside
      aria-label="Social links"
      className="hidden lg:flex fixed left-12 xl:left-16 bottom-0 z-30 flex-col items-center gap-5 text-muted-foreground"
    >
      <ul className="flex flex-col items-center gap-4">
        {links.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="block p-1.5 rounded-md transition-all duration-200 hover:text-primary hover:-translate-y-1"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          </li>
        ))}
      </ul>
      <span className="w-px h-24 bg-border" aria-hidden />
    </aside>
  );
}
