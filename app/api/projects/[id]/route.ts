import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// Handler for the API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Authenticate the user
    const user = await auth();
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse and validate the project ID from the query parameters
    const { id } = req.query;
    const projectId = parseInt(id as string, 10);
    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        // Fetch the specific project
        const project = await db.query.projects.findFirst({
          where: and(
            eq(projects.id, projectId),
            eq(projects.userId, user.id)
          ),
          with: {
            tasks: true, // Include related tasks
          },
        });

        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json(project);

      case 'PATCH':
        // Update the project
        const updateData = req.body;

        const [updatedProject] = await db
          .update(projects)
          .set(updateData)
          .where(
            and(
              eq(projects.id, projectId),
              eq(projects.userId, user.id)
            )
          )
          .returning();

        if (!updatedProject) {
          return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json(updatedProject);

      case 'DELETE':
        // Delete the project
        const [deletedProject] = await db
          .delete(projects)
          .where(
            and(
              eq(projects.id, projectId),
              eq(projects.userId, user.id)
            )
          )
          .returning();

        if (!deletedProject) {
          return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json(deletedProject);

      default:
        // Method not allowed
        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
        return res
          .status(405)
          .json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Error handling project:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
