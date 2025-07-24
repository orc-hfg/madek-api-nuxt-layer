#!/usr/bin/env node

import { execSync } from 'node:child_process';
import process, { exit } from 'node:process';

const RELEASE_TYPES = new Set(['patch', 'minor', 'major']);

/**
 * Validates command line arguments
 */
function validateArguments() {
	const releaseType = process.argv[2];
	const isDevelopmentRelease = process.argv[3] === '--development';

	if (!releaseType || !RELEASE_TYPES.has(releaseType)) {
		console.error('❌ Error: Invalid or missing release type.');
		console.error('Usage: node safe-release.mjs <patch|minor|major> [--development]');
		exit(1);
	}

	return { releaseType, isDevelopmentRelease };
}

/**
 * Ensures we're on the correct branch for the release type
 */
function checkCurrentBranch(isDevelopmentRelease = false) {
	// Note: Using git command is safe in this development script context
	// eslint-disable-next-line sonarjs/no-os-command-from-path
	const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();

	if (!isDevelopmentRelease && currentBranch !== 'main') {
		console.error(`❌ Error: Production releases must be created from main branch.`);
		console.error(`   Current branch: ${currentBranch}`);
		console.error(`   Please switch to main: git checkout main`);
		console.error(`   Or use --development flag for development releases`);
		exit(1);
	}

	if (isDevelopmentRelease && currentBranch !== 'main') {
		console.log(`✅ Branch check passed: creating development release from ${currentBranch}`);
	}
	else {
		console.log('✅ Branch check passed: on main branch');
	}
}

/**
 * Ensures working directory is clean
 */
function checkWorkingDirectory() {
	// Note: Using git command is safe in this development script context
	// eslint-disable-next-line sonarjs/no-os-command-from-path
	const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });

	if (gitStatus.trim()) {
		console.error('❌ Error: Working directory not clean.');
		console.error('   Please commit or stash your changes first.');
		console.error('   Uncommitted changes:');
		console.error(gitStatus);
		exit(1);
	}

	console.log('✅ Working directory check passed: clean');
}

/**
 * Pulls latest changes from origin/main
 */
function pullLatestChanges() {
	console.log('📥 Pulling latest changes from origin/main...');

	try {
		// Note: Using git command is safe in this development script context
		// eslint-disable-next-line sonarjs/no-os-command-from-path
		execSync('git pull origin main', { stdio: 'inherit' });
		console.log('✅ Git pull completed successfully');
	}
	catch {
		console.error('❌ Error: Failed to pull from origin/main');
		console.error('   Please resolve any conflicts manually');
		exit(1);
	}
}

/**
 * Creates and pushes the release
 */
function createRelease(releaseType, isDevelopmentRelease) {
	const releaseTypeLabel = isDevelopmentRelease ? `development ${releaseType}` : releaseType;
	console.log(`✅ Pre-flight checks passed. Creating ${releaseTypeLabel} release...`);
	console.log('');

	try {
		// Step 1: Bump version and create git tag
		console.log(`📝 Bumping ${releaseTypeLabel} version...`);

		if (isDevelopmentRelease) {
			// For development releases, create a pre-release version with 'dev' prefix
			// Note: Using npm command is safe in this development script context
			// eslint-disable-next-line sonarjs/os-command
			execSync(`npm version pre${releaseType} --preid=dev -m "chore: development release %s"`, { stdio: 'inherit' });
		}
		else {
			// Note: Using npm command is safe in this development script context
			// eslint-disable-next-line sonarjs/os-command
			execSync(`npm version ${releaseType} -m "chore: release %s"`, { stdio: 'inherit' });
		}
		console.log('✅ Version bumped and git tag created');

		// Step 2: Push changes and tags to remote
		console.log('📤 Pushing changes and tags to remote...');
		// Note: Using git command is safe in this development script context
		// eslint-disable-next-line sonarjs/no-os-command-from-path
		execSync('git push --follow-tags', { stdio: 'inherit' });
		console.log('✅ Changes and tags pushed successfully');

		// Step 3: Success message with next steps
		console.log('');
		console.log(`🎉 ${releaseTypeLabel} release created and pushed successfully!`);
		console.log('');
		console.log('📋 Next steps:');
		console.log('   ✅ Git tag has been pushed to remote');
		console.log('   ⏳ GitHub Actions will automatically create the GitHub release');
		console.log('   📦 Package will be published automatically to GitHub Packages');
		if (isDevelopmentRelease) {
			console.log('   🚧 Release will be marked as pre-release automatically');
			console.log('   🧪 Use this version for testing in your main app');
		}
		else {
			console.log('   🎯 Release will be marked as stable/latest');
		}
	}
	catch {
		console.error(`❌ Error: Failed to create ${releaseTypeLabel} release`);
		console.error('   Please check the error messages above and resolve any issues');
		exit(1);
	}
}

/**
 * Main orchestration function
 */
function main() {
	const { releaseType, isDevelopmentRelease } = validateArguments();

	console.log(`🚀 Starting safe ${releaseType} release...`);

	// Run all pre-flight checks
	checkCurrentBranch(isDevelopmentRelease);
	checkWorkingDirectory();
	pullLatestChanges();

	// Create and push the release
	createRelease(releaseType, isDevelopmentRelease);
}

main();
