import "@/app/globals.css";
import "@/app/satoshi.css";

export const metadata = {
  title: "Streetflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="../public/favivon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
