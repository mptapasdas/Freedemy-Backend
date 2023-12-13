const editDist = (str1, str2) => {
    let m = str1.length;
    let n = str2.length;
    let dp = new Array(m + 1);
    for (let i = 0; i < m + 1; i++) {
        dp[i] = new Array(n + 1);
        for (let j = 0; j < n + 1; j++) {
            dp[i][j] = 0;
        }
    }

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) dp[i][j] = j;
            else if (j === 0) dp[i][j] = i;
            else if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else
                dp[i][j] =
                    1 +
                    Math.min(
                        dp[i][j - 1], // Insert
                        dp[i - 1][j], // Remove
                        dp[i - 1][j - 1]
                    ); // Replace
        }
    }

    return dp[m][n];
};

module.exports = { editDist };
