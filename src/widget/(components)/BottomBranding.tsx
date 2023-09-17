export default function BottomBranding({ link = "https://yourgpt.ai", title = "YouGPT" }: { title: string; link: string }) {
  return (
    <div className="ygpt-text-sm ygpt-flex ygpt-justify-center ygpt-bg-gray-50 ygpt-py-[4px]">
      <div>
        <span style={{ opacity: "50%", fontSize: "inherit" }}>Powered by </span>
        <strong>
          <a
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontSize: 14,
              opacity: "70%",
            }}
            href={link}
          >
            {title}
          </a>
        </strong>
      </div>
    </div>
  );
}
