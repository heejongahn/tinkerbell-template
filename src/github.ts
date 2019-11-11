import { Toolkit } from "actions-toolkit";

export default function createIssue(title: string, body: string) {
  Toolkit.run(
    async tools => {
      tools.log.info(`Creating new issue ${title}`);

      // Create the new issue
      try {
        const issue = await tools.github.issues.create({
          ...tools.context.repo,
          title,
          body,
        });

        tools.log.success(
          `Created issue ${issue.data.title}#${issue.data.number}: ${issue.data.html_url}`,
        );
      } catch (err) {
        // Log the error message
        tools.log.error(err);

        // The error might have more details
        if (err.errors) tools.log.error(err.errors);

        // Exit with a failing status
        tools.exit.failure();
      }
    },
    {
      secrets: ["GITHUB_TOKEN"],
    },
  );
}
