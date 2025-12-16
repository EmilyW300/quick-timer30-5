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
