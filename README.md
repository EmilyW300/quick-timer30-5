quick-timer
===========

let's count down!

![alt screenshot](https://raw.github.com/zbryikt/quick-timer/master/screenshot.png)

## 處理程式碼衝突的小技巧

當版本控制系統出現衝突時，可以依照以下步驟解決：

1. **取得最新變更**：先執行 `git pull` 將遠端更新抓下來，確保本機與最新狀態同步。
2. **確認衝突檔案**：使用 `git status` 找出標記為 `both modified` 的檔案，這些檔案內會出現 `<<<<<<<`、`=======`、`>>>>>>>` 的衝突標記。
3. **逐一清理衝突**：打開有衝突的檔案，依需求保留或合併兩端內容，移除所有衝突標記後，確定程式可以正常運作。
4. **驗證功能**：執行相關測試或手動檢查重要功能，確保合併後的程式行為正確。
5. **提交解決結果**：用 `git add` 將已修正的檔案加入暫存，`git commit` 記錄這次的衝突解決，最後 `git push` 將結果推送到遠端。

這樣的流程能讓衝突處理更有條理，也避免遺漏重要變更。

### 目前專案的衝突狀態與對應指引

- **目前狀態**：使用 `git diff --name-only --diff-filter=U` 與 `rg "<<<<<<<"` 檢查後，沒有發現任何尚未解決的衝突標記，因此工作目錄目前是乾淨的。
- **如果之後出現衝突**：
  - 檔案裡會出現三段標記：
    - `<<<<<<< HEAD` 之後到 `=======` 之間代表你本地的內容。
    - `=======` 到 `>>>>>>> branch-name` 之間代表來自另一個分支（或遠端）的內容。
  - 依需求決定要保留哪段、或將兩邊合併重寫，再把這些標記全部刪除。
  - 清理完成後，重新閱讀周邊程式碼，確保縮排、括號與結構正確，再跑一次測試或手動檢查主要功能。
  - 最後用 `git add <file>`、`git commit` 紀錄修正，再繼續後續的開發或推送。

有任何衝突都可以依照上面步驟逐一檢查與處理，必要時也可以使用比對工具（例如 VS Code 的比較檢視）協助合併。

Demo
----------
please check [this demo](http://zbryikt.github.io/quick_timer) for this timer.

License
----------
License: http://g0v.mit-license.org/.

Attribution
----------
Some sound effects are from soundbible.com:

* [boxing-bell.mp3](http://soundbible.com/1559-Boxing-Arena-Sound.html) (CC-BY-3.0)
* [fire-alarm.mp3](http://soundbible.com/1550-Fire-Alarm.html) (CC-BY-3.0)
* [cop-car.mp3](http://soundbible.com/1058-Cop-Car-Siren.html) (CC-BY-3.0)
