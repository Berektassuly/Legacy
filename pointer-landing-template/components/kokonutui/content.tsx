
import OrganizationsTable from "./organizations-table";
import CredentialsTable from "./credentials-table";

// Define types for our data to ensure type safety
interface Organization {
  id: string;
  name: string;
  wallet_address: string;
  is_verified: boolean;
  website_url: string;
}

interface Credential {
  id: string;
  title: string;
  recipient_wallet_address: string;
  transaction_hash: string;
  organizations: {
    name: string;
  };
}

interface ContentProps {
  organizations: Organization[];
  credentials: Credential[];
}

export default function Content({ organizations, credentials }: ContentProps) {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Web3 Credentials Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Monitor verified organizations and the soulbound credentials they issue.
        </p>
      </section>

      <OrganizationsTable organizations={organizations} />
      <CredentialsTable credentials={credentials} />
    </div>
  );
}

